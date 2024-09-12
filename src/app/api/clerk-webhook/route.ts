import { Webhook } from "svix";
import { headers } from "next/headers";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  const payload = await req.json();
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing webhook headers", { status: 400 });
  }

  const body = JSON.stringify(payload);
  const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");

  let evt: any;

  try {
    evt = webhook.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (error) {
    console.error("Error verifying webhook:", error);
    return new Response("Webhook verification failed", { status: 400 });
  }

  const eventType = evt.type;

  // If the event is `user.created`, handle user creation
  if (eventType === "user.created") {
    const { id, email_addresses } = evt.data;

    try {
      await dbConnect();

      // Check if the user already exists
      const existingUser = await User.findOne({ clerkUserId: id });

      if (existingUser) {
        console.log("User already exists in MongoDB:", existingUser);
        return new Response("User already exists", { status: 200 });
      }

      // Create new user
      const newUser = new User({
        clerkUserId: id,
        email: email_addresses[0].email_address,
      });

      await newUser.save();

      console.log("User created successfully in MongoDB");
      return new Response("User created", { status: 201 });
    } catch (error) {
      console.error("Error creating user in MongoDB:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  }

  // Handle other event types
  return new Response("Event type not supported", { status: 200 });
}
