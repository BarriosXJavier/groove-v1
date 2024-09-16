
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

   
    await newListing.save()

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
