import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";
import { connectToMongoDb } from "@/lib/mongodb";
import Listing from "@/app/models/listing.model";
import { auth } from "@clerk/nextjs/server";
import { getAuth } from "@clerk/nextjs/server";


export async function GET(
  req: Request,
  { params }: { params: { listing_id: string } }
) {
  await connectToMongoDb();
  const { userId } = auth();

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

    if (listing.clerkId !== userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access" },
        { status: 403 }
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



// PUT method for updating listings
export async function PUT(
  request: NextRequest,
  { params }: { params: { listing_id: string } }
) {
 
 await connectToMongoDb();
  const { userId } = getAuth(request);  // Retrieves userId from Clerk authentication

  const requestBody = await request.json();

  if (!userId) {
    console.log("Unauthorized access - user is not authenticated");
    return NextResponse.json(
      { success: false, error: "Unauthorized access" },
      { status: 401 }
    );
  }

  const { title, price, description, location, tags, category, images } = requestBody;

  if (!mongoose.Types.ObjectId.isValid(params.listing_id)) {
    console.log("Invalid listing ID format");
    return NextResponse.json(
      { success: false, error: "Invalid listing ID format" },
      { status: 400 }
    );
  }

  try {
    const listing = await Listing.findById(params.listing_id).exec();
    if (!listing) {
      console.log("Listing not found");
      return NextResponse.json(
        { success: false, message: "Listing not found" },
        { status: 404 }
      );
    }

    // Check if the authenticated user is the owner of the listing
    if (listing.clerkId !== userId) {
      console.log("Unauthorized access - user does not own this listing");
      return NextResponse.json(
        { success: false, error: "Unauthorized access" },
        { status: 403 }
      );
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      params.listing_id,
      {
        title,
        price,
        description,
        location,
        tags: tags?.split(",").map((tag: string) => tag.trim()),
        category,
        images,
      },
      { new: true, runValidators: true }
    ).exec();

    console.log("Listing updated successfully:", updatedListing);
    return NextResponse.json(
      { success: true, data: updatedListing },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating listing:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
