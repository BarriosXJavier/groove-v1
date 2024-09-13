import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["normal", "premium"], default: "normal" },
    paymentStatus: { type: Boolean, default: false },
    clerkUserId: { type: String, required: true, unique: true }, // Clerk user ID for easy lookup
  },
  { timestamps: true }
);

// Check if the model already exists in mongoose.models
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;