import { NextResponse } from "next/server";
import { connectToMongoDb } from "@/lib/mongodb";
import Listing from "@/app/models/listing.model";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Missing search query" },
      { status: 400 }
    );
  }

  try {
    await connectToMongoDb(); 
    const listings = await Listing.find({
      name: { $regex: query, $options: "i" },
    });

    return NextResponse.json(listings, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching listings" },
      { status: 500 }
    );
  }
}
