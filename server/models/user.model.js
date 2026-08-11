import mongoose from "mongoose";
import jwt from "jsonwebtoken"; 
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },  
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    refreshToken: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false, 
    },
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user",
    }
},
    {
        timestamps: true,
    }
);

userSchema.methods.isPasswordCorrect = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password);
};

userSchema.methods.generateAccessToken = function(){
   return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN}
    )
}

userSchema.methods.generateRefreshToken = function(){
   return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN}
    )
}


export const User = mongoose.model("User", userSchema);