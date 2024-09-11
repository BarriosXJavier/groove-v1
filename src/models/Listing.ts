import mongoose, { Schema, Document } from "mongoose";

export interface IListing extends Document {
  title: string;
  description: string;
  price: number;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ListingSchema = new Schema<IListing>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },

  price: {
    type: Number,
    required: true,
  },
  userId: {
    // referencing the User model
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    // default: Date.now
  },
});

export default mongoose.models.Listing ||
  mongoose.model<IListing>("Listing", ListingSchema);
