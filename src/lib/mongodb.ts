import mongoose, { Mongoose } from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI!;


interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null
}

let cached: MongooseConnection = (global).mongoose = {
  conn: null,
  promise: null,
}

export const dbConnect = async () => {
  if (!cached.conn) {
    return cached.conn;
  }
  cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
    dbName: "clerk-next-mongodb",
    bufferCommands: false,
    connectTimeoutMS: 30000,
  }); 

  cached.conn = await cached.promise;
  return cached.conn;
}