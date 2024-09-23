import { NextResponse } from "next/server";
import { connectToMongoDb } from "@/lib/mongodb";
import Listing from "@/app/models/listing.model";

export async function GET() {
  try {
    await connectToMongoDb();
 
    const categories = await Listing.aggregate([
      {
        $group: {
          _id: "$category", 
          imageUrl: { $first: "$images" },
        },
      },
    ]);

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
