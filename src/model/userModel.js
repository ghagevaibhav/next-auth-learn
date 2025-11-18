import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
        username: {
                type: String, 
                required: [true, "Please Provide a username"], 
                unique: true
        },
        email: {
                type: String, 
                required: [true, "Please Provide a email"],  
                unique: true
        },
        password: {
                type: String, 
                required: [true, "Please Provide a password"],
                minlength: [8, "Password must be at least 8 characters long"]
        },
        isVerified: {
                type: Boolean,
                default: false,
        },
        isAdmin: {
                type: Boolean,
                default: false
        },
        forgotPasswordToken: String,
        forgotPasswordExpiry: Date,
        verifyToken: String,
        verifyExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User;
