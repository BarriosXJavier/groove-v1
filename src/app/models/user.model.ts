import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
    maxlength: [15, "Username can't exceed 15 characters"],
  },
  firstName: {
    type: String,
    required: true,
    maxlength: [50, "First name can't exceed 50 characters"],
  },
  lastName: {
    type: String,
    required: true,
    maxlength: [50, "Last name can't exceed 50 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = models?.User || model("User", UserSchema);
export default User;
