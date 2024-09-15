import { NextResponse } from "next/server";
import { connectToMongoDb } from "@/lib/mongodb";
import Listing from "@/app/models/listing.model";
import { auth } from "@clerk/nextjs/server";

// Handle POST request for creating a new listing
export async function POST(req: Request) {
  await connectToMongoDb();

  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { title, price, description, location, tags, images } =
      await req.json();

    const newListing = new Listing({
      clerkId: userId,
      title,
      price,
      description,
      location,
      tags: tags.split(",").map((tag: string) => tag.trim()),
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
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const listings = await Listing.find({ clerkId: userId });
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
