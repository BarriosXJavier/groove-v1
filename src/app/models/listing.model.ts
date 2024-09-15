import { Schema, model, models } from "mongoose";

const ListingSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      maxlength: [100, "Title can't exceed 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0.01, "Price must be greater than 0"],
    },
    description: {
      type: String,
      required: true,
      maxlength: [250, "Description can't exceed 250 characters"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    tags: {
      type: [String],
    },
    images: {
      type: [String], // Array of image URLs
      validate: {
        validator: (v: string[]) => v.length <= 5,
        message: "You can upload up to 5 images",
      },
    },
    clerkId: {
      type: String,
      required: [true, "Clerk ID is required"], // Ensure clerkId is required
    },
  },
  { timestamps: true }
);

// Export the model, or reuse if it already exists
const Listing = models.Listing || model("Listing", ListingSchema);

export default Listing;
