import { asyncHandler } from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { User } from "../models/user.model.js";
import { Otp } from "../models/otp.model.js";
import { Event } from "../models/event.model.js";
import { Booking } from "../models/booking.model.js";
import { sendEmail, sendBookingEmail } from "../utils/emails.js";

const OTP_EXPIRY_MINUTES = 10;

const generateOTP = () => {
    return crypto.randomInt(100000, 1000000).toString();
};


const sendBookingOtp = asyncHandler(async (req, res) => {
    const { eventId } = req.body;
    const userEmail = req.user.email;

    if (!eventId) {
        throw new apiError(400, "eventId is required");
    }

    const event = await Event.findById(eventId);
    if (!event) {
        throw new apiError(404, "No Event found");
    }
    if (event.availableSeats <= 0) {
        throw new apiError(400, "No seats are available");
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

    await Otp.deleteMany({ email: userEmail, action: "booking_verification" });
    await Otp.create({ email: userEmail, otp, action: "booking_verification", expiresAt });

    await sendEmail({
        to: userEmail,
        subject: "Your booking verification code",
        body: `Your OTP is ${otp}. It is valid for ${OTP_EXPIRY_MINUTES} minutes.`
    });

    res.status(200).json({ success: true, message: "OTP sent to email" });
});

const bookEvent = asyncHandler(async (req, res) => {
    const { eventId, otp, quantity } = req.body;

    if (!eventId || !otp || !quantity) {
        throw new apiError(400, "eventId, otp and quantity are required");
    }

    const event = await Event.findById(eventId);
    if (!event) {
        throw new apiError(404, "No Event found");
    }
    
    if (event.availableSeats < quantity) {
        throw new apiError(400, "Not enough seats available");
    }

    const existingBooking = await Booking.findOne({ eventId, userId: req.user._id });
    if (existingBooking) {
        throw new apiError(409, "Booking already exists");
    }

    const otpRecord = await Otp.findOne({ email: req.user.email, action: "booking_verification" });
    if (!otpRecord) {
        throw new apiError(400, "No OTP found. Please request a new one");
    }
    if (otpRecord.expiresAt < new Date()) {
        await Otp.deleteOne({ _id: otpRecord._id });
        throw new apiError(400, "OTP has expired. Please request a new one");
    }
    if (otpRecord.otp !== otp) {
        throw new apiError(400, "Invalid OTP");
    }

    const booking = await Booking.create({
        userId: req.user._id,
        eventId,
        quantity,
        amount: event.ticketPrice * quantity
    });

    event.availableSeats -= quantity;
    await event.save();

    await Otp.deleteOne({ _id: otpRecord._id });

    res.status(201).json({
        success: true,
        message: "Booking created. Please check your email for confirmation.",
        data: booking
    });
});

const confirmBooking = asyncHandler(async (req, res) => {
    const { paymentStatus } = req.body;

    if (!["paid", "non-paid"].includes(paymentStatus)) {
        throw new apiError(400, "Invalid payment status");
    }

    const booking = await Booking.findById(req.params.id).populate('eventId').populate('userId');
    if (!booking) {
        throw new apiError(404, "Booking not found");
    }
    if (booking.status === 'confirmed') {
        throw new apiError(400, "Booking already confirmed");
    }

    const event = await Event.findById(booking.eventId._id);
    if (!event) {
        throw new apiError(404, "Event not found");
    }
    if (event.availableSeats <= 0) {
        throw new apiError(400, "Seats are not available");
    }

    booking.status = "confirmed";
    booking.paymentStatus = paymentStatus;
    await booking.save();

    event.availableSeats -= 1;
    await event.save();

    const bookingUser = booking.userId;
    await sendBookingEmail(
        bookingUser.email,
        bookingUser.username,
        event.title,
        event.date,
        event.availableSeats
    );

    res.status(200).json({
        success: true,
        message: "Booking confirmed",
        data: booking
    });
});

const getMyBookings = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const bookings = await Booking.find({ userId }).populate('eventId');

    res.status(200).json({
        success: true,
        data: bookings
    });
});

const cancelBooking = asyncHandler(async (req, res) => {
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
        throw new apiError(404, "Booking not found");
    }
    if (booking.userId.toString() !== req.user._id.toString()) {
        throw new apiError(403, "Unauthorized");
    }

    if (booking.status === 'confirmed') {
        const event = await Event.findById(booking.eventId);
        if (event) {
            event.availableSeats += booking.quantity || 1;
            await event.save();
        }
    }

    await Booking.findByIdAndDelete(bookingId);

    res.status(200).json({
        success: true,
        message: "Booking cancelled"
    });
});

export {
    bookEvent, getMyBookings, confirmBooking, cancelBooking, sendBookingOtp
};