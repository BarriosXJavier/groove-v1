"use server";

import User from "@/app/models/user.model";
import { connectToMongoDb } from "@/lib/mongodb";
import { Document } from "mongoose";

// Define the interface for the user document
interface IUser extends Document {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  create_At: Date;
}

// Shape of the input data
interface CreateUserData {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
}

// Create a new user
export async function createUser(
  userData: CreateUserData
): Promise<IUser | null> {
  try {
    await connectToMongoDb();
    const newUser = await User.create(userData);
    return JSON.parse(JSON.stringify(newUser));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === 11000) {
      console.error("Duplicate value detected:", error.keyValue);
      throw new Error("Duplicate entry: email or clerkId already exists");
    } else {
      console.error("Error creating user:", error);
      throw error;
    }
  }
}

export async function findUserByClerkId(
  clerkId: string
): Promise<IUser | null> {
  try {
    await connectToMongoDb();
    const user = await User.findOne({ clerkId });
    return user ? JSON.parse(JSON.stringify(user)) : null;
  } catch (error) {
    console.error("Error finding user by Clerk ID:", error);
    return null;
  }
}

export async function findUserByEmail(email: string): Promise<IUser | null> {
  try {
    await connectToMongoDb();
    const user = await User.findOne({ email });
    return user ? JSON.parse(JSON.stringify(user)) : null;
  } catch (error) {
    console.error("Error finding user by email:", error);
    return null;
  }
}

