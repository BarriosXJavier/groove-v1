"use server";

import User from "@/app/models/user.model";
import { connectToMongoDb } from "@/lib/mongodb";
import { Document } from "mongoose";

// Define the interface for the user document
interface IUser extends Document {
  clerkId: string;
  email: string;
  create_At: Date;
}

// Shape of the input data
interface CreateUserData {
  clerkId: string;
  email: string;
}

export async function createUser(
  userData: CreateUserData
): Promise<IUser | null> {
  try {
    await connectToMongoDb();
    const newUser = await User.create(userData);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
}
