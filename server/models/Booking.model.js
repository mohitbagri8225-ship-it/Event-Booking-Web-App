import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "cancelled"],
            default: "pending"
        },
        paymentStatus: {
            type: String,
            enum: ["non-paid", "paid"],
            default: "non-paid"
        },
        amount: {
            type: Number,
            required: true,
            min: 0
        }
    },
    { timestamps: true }
);

bookingSchema.index({ userId: 1 });
bookingSchema.index({ eventId: 1 });

export const Booking = mongoose.model("Booking", bookingSchema);