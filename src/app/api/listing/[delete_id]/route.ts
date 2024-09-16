
import { NextResponse } from "next/server";
import { connectToMongoDb } from "@/lib/mongodb";
import Listing from "@/app/models/listing.model";
import { auth } from "@clerk/nextjs/server";
import { ObjectId } from "mongodb";

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
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Listing ID is required" },
        { status: 400 }
      );
    }

    let objectId;
    try {
      objectId = new ObjectId(id);
    } catch (error) {
      return NextResponse.json(
        { success: false, error: "Invalid Listing ID" },
        { status: 400 }
      );
    }

    const result = await Listing.deleteOne({ _id: objectId, clerkId: userId });

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
