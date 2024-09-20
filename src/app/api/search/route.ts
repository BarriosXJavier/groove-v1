import { connectToMongoDb } from "@/lib/mongodb";
import Listing from "@/app/models/listing.model";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "No search query provided" },
      { status: 400 }
    );
  }

  try {
    await connectToMongoDb();
    const searchResults = await Listing.find({
      title: { $regex: query, $options: "i" }, // Case-insensitive search
    }).lean();

    const formattedResults = searchResults.map((result) => ({
      ...result,
      listingId: result._id.toString(),
    }));

    return NextResponse.json({ results: formattedResults });
  } catch (error) {
    console.error("Error fetching search results:", error);
    return NextResponse.json(
      { error: "Error fetching search results" },
      { status: 500 }
    );
  }
}
