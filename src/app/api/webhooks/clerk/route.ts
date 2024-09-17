import { Webhook, WebhookRequiredHeaders } from "svix";
import { headers } from "next/headers";
import { clerkClient, WebhookEvent } from "@clerk/nextjs/server";
import {
  createUser,
  findUserByClerkId,
  findUserByEmail,
} from "../../../../../actions/user.action";
import { NextResponse } from "next/server";

interface ClerkWebhookUserCreatedEvent {
  email_addresses: { email_address: string }[];
  first_name: string;
  last_name: string;
  username?: string;
}

interface User {
  clerkId: string;
  email: string;
  username?: string;
  firstName: string;
  lastName: string;
}

export async function POST(req: Request) {
  console.log("Webhook received");

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    console.error("CLERK_WEBHOOK_SECRET is not set");
    return new Response("Webhook secret is not set", { status: 500 });
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Error occurred -- no svix headers");
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.text();
  const body = payload;


  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    } as WebhookRequiredHeaders) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response(`Error verifying webhook: ${err}`, {
      status: 400,
    });
  }

  const { id } = evt.data as { id: string };
  const eventType = evt.type;

  console.log(`Webhook verified. Event type: ${eventType}`);

  if (eventType === "user.created") {
    const { email_addresses, first_name, last_name } =
      evt.data as ClerkWebhookUserCreatedEvent;
    const email = email_addresses[0]?.email_address || "";

    try {
      const existingUserById = await findUserByClerkId(id);
      const existingUserByEmail = await findUserByEmail(email);

      if (existingUserById || existingUserByEmail) {
        console.log("User already exists");
        return NextResponse.json(
          {
            message: "User already exists",
            user: existingUserById || existingUserByEmail,
          },
          { status: 200 }
        );
      }

      const user: User = {
        clerkId: id,
        email: email,
        firstName: first_name,
        lastName: last_name,
      };

      console.log("Creating new user:", user);
      const newUser = await createUser(user);

      if (newUser) {
        console.log("Updating Clerk user metadata");
        await clerkClient.users.updateUserMetadata(id, {
          publicMetadata: {
            userId: newUser._id,
          },
        });
      }

      console.log("New user created successfully");
      return NextResponse.json(
        { message: "New user created", user: newUser },
        { status: 201 }
      );
    } catch (error) {
      console.error("Error handling user creation:", error);
      return NextResponse.json(
        { error: "Error handling user creation" },
        { status: 500 }
      );
    }
  }

  console.log(`Webhook processed: ID ${id}, Type ${eventType}`);
  return NextResponse.json({ received: true }, { status: 200 });
}
