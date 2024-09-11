import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_CONNECTION_STRING;

// check if connection string exists
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URL environment variable inside .env.local"
  );
}

interface Cached {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// cached connection to prevent connections from being 
// made multiple times while nextjs hot reloads
let cached: Cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("connected to mongodb");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
  return cached.conn;
}

export default dbConnect;
