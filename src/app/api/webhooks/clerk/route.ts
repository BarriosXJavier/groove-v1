import { Webhook } from "svix";
import { headers } from "next/headers";
import { clerkClient, WebhookEvent } from "@clerk/nextjs/server";
import {
  createUser,
  findUserByClerkId,
  findUserByEmail,
} from "../../../../../actions/user.action";
import { NextResponse } from "next/server";

// Define an interface for the Clerk webhook event payload (user.created)
interface ClerkWebhookUserCreatedEvent {
  email_addresses: { email_address: string }[];
  first_name?: string;
  last_name?: string;
  username?: string;
}

// Define an interface for the user object you are constructing
interface User {
  clerkId: string;
  email: string;
  username?: string;
  firstName: string;
  lastName: string;
}

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }

  const { id } = evt.data as { id: string }; // Ensure `id` is correctly typed
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { email_addresses, first_name, last_name, username } =
      evt.data as ClerkWebhookUserCreatedEvent;

    const email = email_addresses[0]?.email_address || "";

    // Check if the user already exists by Clerk ID or email
    try {
      const existingUserById = await findUserByClerkId(id);
      const existingUserByEmail = await findUserByEmail(email);

      if (existingUserById || existingUserByEmail) {
        return NextResponse.json(
          {
            message: "User already exists",
            user: existingUserById || existingUserByEmail,
          },
          { status: 200 }
        );
      }

      // Construct the user object 
      const user: User = {
        clerkId: id,
        email: email,
        username: username || "",
        firstName: first_name || "",
        lastName: last_name || "",
      };

      const newUser = await createUser(user);

      if (newUser) {
        await clerkClient().users.updateUserMetadata(id, {
          publicMetadata: {
            userId: newUser._id,
          },
        });
      }

      return NextResponse.json(
        { message: "New user created", user: newUser },
        { status: 201 }
      );
    } catch (error) {
      console.error("Error handling user creation:", error);
      return new Response("Error handling user creation", { status: 500 });
    }
  }

  console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
  return new Response("", { status: 200 });
}
