import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    bio : {
        type: String,
    },
    photo: {
        type: String
    },
    role : {
        type: String,
        required: true,
        default: "student"
    },
    contact: {
        type: String
    },
    location: {
        type: String,
    },
    profession : {
        type: String
    },
    birthDate: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
        default: "male"
    }


});


export const User = mongoose.models.User || mongoose.model("User", UserSchema);

