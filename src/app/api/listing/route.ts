import { NextResponse } from "next/server";
import { connectToMongoDb } from "@/lib/mongodb";
import Listing from "@/app/models/listing.model";
import { auth } from "@clerk/nextjs/server";

// POST method (for creating listings)
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

    const processedTags = tags
      ? tags.split(",").map((tag: string) => tag.trim())
      : [];

    const newListing = new Listing({
      clerkId: userId,
      title,
      price,
      description,
      location,
      tags: processedTags,
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

// GET method (for fetching listings)
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

// DELETE method (for deleting listings)
export async function DELETE(req: Request) {
  await connectToMongoDb();

  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Extract listing ID from URL
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // Extract ID from the URL path

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Listing ID is required" },
        { status: 400 }
      );
    }

    const result = await Listing.deleteOne({ _id: id, clerkId: userId });

    if (result.deletedCount === 1) {
      return NextResponse.json(
        { success: true, message: "Listing deleted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: "Listing not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error deleting listing:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete listing" },
      { status: 500 }
    );
  }
}
