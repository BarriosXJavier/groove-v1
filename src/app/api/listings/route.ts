import { NextResponse } from "next/server";
import { connectToMongoDb } from "@/lib/mongodb";
import Listing from "@/app/models/listing.model";

// Handle POST request for creating a new listing
export async function POST(req: Request) {
  await connectToMongoDb();

  try {
    const { title, price, description, location, tags, images } =
      await req.json();

    // Create a new listing
    const newListing = new Listing({
      title,
      price,
      description,
      location,
      tags: tags.split(",").map((tag: string) => tag.trim()), // Split tags by commas
      images,
    });

    await newListing.save();

    return NextResponse.json(
      { success: true, data: newListing },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating listing:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create listing" },
      { status: 400 }
    );
  }
}

// Handle GET requests for fetching listings
export async function GET() {
  await connectToMongoDb();

  try {
    const listings = await Listing.find();
    return NextResponse.json(
      { success: true, data: listings },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching listings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch listings" },
      { status: 500 }
    );
  }
}
