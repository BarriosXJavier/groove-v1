import { NextResponse } from "next/server";
import { connectToMongoDb } from "@/lib/mongodb";
import Listing from "@/app/models/listing.model";

export async function GET(req: Request) {
  try {
    await connectToMongoDb();

    // Extract the category from the query params
    const url = new URL(req.url);
    const category = url.searchParams.get("categories");

    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not provided" },
        { status: 400 }
      );
    }

    const listings = await Listing.find({ category: category.trim() });

    return NextResponse.json({ success: true, data: listings });
  } catch (error) {
    console.error("Error fetching listings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch listings" },
      { status: 500 }
    );
  }
}
