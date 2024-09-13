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
    },

    create_At: {
        type: Date,
        default: Date.now
    }

})

const User = models?.User || model("User", UserSchema);
export default User
