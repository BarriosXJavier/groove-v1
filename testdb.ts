import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(req, res) {
  await dbConnect();

  try {
    const newUser = new User({
      clerkUserId: "testId",
      email: "test@example.com",
    });
    await newUser.save();
    res.status(201).json({ message: "Test user created" });
  } catch (error) {
    res.status(500).json({ error: "Error creating test user" });
  }
}

handler()