import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true},
    role: { type: String, enum: ['normal', 'premium'], default: 'normal'},
    paymentStatus: {type: Boolean, default: false}
});

export default mongoose.models.User || mongoose.model('User', UserSchema);