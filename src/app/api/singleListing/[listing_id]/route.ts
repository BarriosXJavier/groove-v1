import { NextResponse } from "next/server";
import { connectToMongoDb } from "@/lib/mongodb";
import Listing from "@/app/models/listing.model";

export async function GET(
  req: Request,
  { params }: { params: { listingId: string } }
) {
  await connectToMongoDb();

  try {
    const { listingId } = params; 
    const listing = await Listing.findById(listingId);

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
