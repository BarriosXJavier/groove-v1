import { NextResponse } from "next/server";
import { connectToMongoDb } from "@/lib/mongodb";
import Listing from "@/app/models/listing.model";
import { auth } from "@clerk/nextjs/server";

// Create listing
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

    const { title, price, description, location, tags, images, category } =
      await req.json();

    const processedTags = Array.isArray(tags)
      ? tags
      : tags.split(",").map((tag: string) => tag.trim());

    const selectedCategory = category || "Other";

    const newListing = new Listing({
      clerkId: userId,
      title,
      price,
      description,
      location,
      tags: processedTags,
      images,
      category: selectedCategory,
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
export async function GET(req: Request) {
  await connectToMongoDb();

  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get the search parameters for pagination
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "6", 10); // Default 6 listings per page
    const skip = (page - 1) * limit;

    // Fetch paginated listings
    const totalListings = await Listing.countDocuments({ clerkId: userId });
    const listings = await Listing.find({ clerkId: userId })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalListings / limit);

    return NextResponse.json(
      {
        success: true,
        data: listings,
        currentPage: page,
        totalPages: totalPages,
        totalListings: totalListings,
      },
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

