import dbConnect from "@/lib/mongodb";
import dotenv from "dotenv";

dotenv.config()


async function testConnection() {
  try {
    await dbConnect();
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

console.log("MONGODB_URL:", process.env.MONGODB_URL);

testConnection();


