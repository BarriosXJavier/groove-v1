import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Clerk user ID
  listingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Bookmark ||
  mongoose.model("Bookmark", bookmarkSchema);
