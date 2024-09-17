import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToMongoDb } from "@/lib/mongodb";
import Listing from "@/app/models/listing.model";

export async function GET(
  req: Request,
  { params }: { params: { listing_id: string } }
) {
  await connectToMongoDb();

  try {
    const { listing_id } = params;

    if (!mongoose.Types.ObjectId.isValid(listing_id)) {
      return NextResponse.json(
        { success: false, error: "Invalid listing ID format" },
        { status: 400 }
      );
    }

    const listing = await Listing.findById(listing_id).exec();

    if (!listing) {
      return NextResponse.json(
        { success: false, error: "Listing not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: listing }, { status: 200 });
  } catch (error) {
    console.error("Error fetching listing:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch listing" },
      { status: 500 }
    );
  }
}
