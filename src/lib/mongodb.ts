/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cache: MongooseConnection = (global as any).mongoose;

if (!cache) {
  cache = (global as any).mongoose = { conn: null, promise: null };
}

export const connectToMongoDb = async () => {
  if (cache.conn) return cache.conn;

  cache.promise =
    cache.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "groove-furniture",
      bufferCommands: false,
      connectTimeoutMS: 30000,
    });

  cache.conn = await cache.promise;

  return cache.conn; 
};
