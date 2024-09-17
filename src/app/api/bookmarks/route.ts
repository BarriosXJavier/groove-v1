import { NextResponse } from "next/server";
import { connectToMongoDb } from "@/lib/mongodb";
import Bookmark from "@/app/models/bookmarks.model"; 
export async function POST(req: Request) {
  const { userId, listingId } = await req.json();

  await connectToMongoDb();

  try {
    const existingBookmark = await Bookmark.findOne({ userId, listingId });
    if (existingBookmark) {
      return NextResponse.json(
        { message: "Already bookmarked" },
        { status: 400 }
      );
    }

    const bookmark = new Bookmark({ userId, listingId });
    await bookmark.save();

    return NextResponse.json(
      { message: "Bookmark added", bookmark },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const { userId, listingId } = await req.json();

  await connectToMongoDb();

  try {
    await Bookmark.deleteOne({ userId, listingId });
    return NextResponse.json({ message: "Bookmark removed" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const listingId = searchParams.get("listingId");

  await connectToMongoDb();

  try {
    const bookmark = await Bookmark.findOne({ userId, listingId });
    return NextResponse.json({ isBookmarked: !!bookmark }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
