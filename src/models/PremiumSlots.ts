import mongoose, { Schema, Document } from "mongoose";

export interface IPremiumSlots extends Document {
  userId: string;
  listingId: string;
  expiresAt: Date;
}

const PremiumSlotsSchema = new Schema<IPremiumSlots>({
  userId: {
    type: String,
    required: true,
  },
  listingId: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

export default mongoose.models.PremiumSlots ||
  mongoose.model<IPremiumSlots>("PremiumSlots", PremiumSlotsSchema);
