import { asyncHandler } from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js"; 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 
import {User} from "../models/user.model.js";
import crypto from "crypto";
import { Otp } from "../models/otp.model.js";
const { sendEmail } = await import("../utils/emails.js");

//secure random otp generator
const generateOTP = () => {
    return crypto.randomInt(100000, 1000000).toString();
};

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if(!username || !email || !password){
        throw new apiError(400, "All fields are required");
    }

    const userExists = await User.findOne({ $or: [{ email }, { username }] });

    if(userExists){
        throw new apiError(409, "User with email or username already exists");
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        role: "user",
    });

    await user.save();

    const otp = generateOTP();
    await Otp.create({
        email: user.email,
        otp: otp,
        action: "account_verification"
    });


    await sendEmail(email,otp,'account_verification');
    console.log(`otp for ${email} and ${username}: ${otp}`);
    
    user.otp = otp;
    await user.save();

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if(!createdUser){
        throw new apiError(500, "Failed to create user");
    }

    return res.status(201).json({
        success: true,
        user: createdUser,
        message: "User registered successfully. Please verify your email using the OTP sent."
    });
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        throw new apiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });

    if(!user){
        throw new apiError(404, "User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new apiError(401, "Invalid credentials");
    }

    if(!user.isVerified && user.role === "user"){
        const otp = generateOTP();
        await Otp.deleteMany({ email: user.email, action: "account_verification" });
        await Otp.create({
            email: user.email,
            otp: otp,
            action: "account_verification"
        });
        await sendEmail(user.email, otp, 'account_verification');
        throw new apiError(401, "Please verify your email before logging in");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return res.status(200).json({
        success: true,
        token,
        user
    }).cookie("token", token, {
        httpOnly: true,
        secure: true
    });
});

const logoutUser = asyncHandler(async (req, res) => {
    return res.status(200).json({
        success: true,
        message: "User logged out successfully"
    }).cookie("token", null, {
        httpOnly: true,
        secure: true
    });
});

const verifyOtp = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    if(!email || !otp){
        throw new apiError(400, "Email and OTP are required");
    }

    const otpRecord = await Otp.findOne({ email, otp, action: "account_verification" });

    if(!otpRecord){
        throw new apiError(400, "Invalid or expired OTP");
    }

    const user = await User.findOne({ email });

    if(!user){
        throw new apiError(404, "User not found");
    }

    user.isVerified = true;
    await user.save();

    await Otp.deleteMany({ email, action: "account_verification" });

    return res.status(200).json({
        success: true,
        message: "Email verified successfully"
    });
});

export {
    registerUser,
    loginUser,
    logoutUser,
    verifyOtp
};