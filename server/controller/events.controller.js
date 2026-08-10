import { asyncHandler } from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Otp } from "../models/otp.model.js";
const { sendEmail } = await import("../utils/emails.js");
import { Event } from "../models/event.model.js";

const getAllEvents = asyncHandler(async (req, res) => {

    const filter = {};

    if (req.query.category) {
        filter.category = req.query.category;
    }

    if (req.query.location) {
        filter.location = req.query.location;
    }

    if (req.query.price) {
        filter.price = req.query.price;
    }

    const events = await Event.find(filter);

    if (events.length === 0) {
        throw new apiError(404, "No events found");
    }

    res.status(200).json({
        success: true,
        data: events
    });
});

const getOneEvent = asyncHandler(async (req, res) => {

    const eventId = req.params.id;
    const event = await Event.findById(eventId);

    if (!event) {
        throw new apiError(404, "Event not found");
    }

    res.status(201).json({
        success: true,
        data: event
    });
});

const createEvent = asyncHandler(async (req, res) => {
    const { title, description, date, location, category, ticketPrice, totalSeats, availableSeats, imageUrl } = req.body;

    if (!title || !description || !date || !location || !category || !ticketPrice || !totalSeats || !availableSeats || !imageUrl) {
        throw new apiError(400, "All fields are required");
    }

    if (availableSeats > totalSeats) {
        throw new apiError(400, "Available seats cannot be greater than total seats");
    }

    if (new Date(date) < new Date()) {
        throw new apiError(400, "Event date cannot be in the past");
    }

    if (ticketPrice < 0) {
        throw new apiError(400, "Ticket price cannot be negative");
    }

    if (totalSeats < 0 || availableSeats < 0) {
        throw new apiError(400, "Seats cannot be negative");
    }

    if (!imageUrl.match(/\.(jpeg|jpg|gif|png)$/)) {
        throw new apiError(400, "Image URL must be a valid image format (jpeg, jpg, gif, png)");
    }


    const event = await Event.create({
        title,
        description,
        date,
        location,
        category,
        ticketPrice,
        totalSeats,
        availableSeats,
        imageUrl
    });

    res.status(201).json({
        success: true,
        data: event
    });
});

const updateEvent = asyncHandler(async (req, res) => {
    const { title, description, date, location, category, ticketPrice, totalSeats, availableSeats, imageUrl } = req.body;
    const eventId = req.params;

    const event = await Event.findById(eventId);

    if (!event) {
        throw new apiError(404, "Event not found");
    }

    await Event.findByIdAndUpdate({
        title, description, date, location, category, ticketPrice, totalSeats, availableSeats, imageUrl
    }, { new: true });

    const updatedEvent = await Event.findById(eventId);

    if (!updatedEvent) {
        throw new apiError(500, "error in updating the event");
    }

    res.status(200).json({
        success: true,
        data: updatedEvent
    });
})

const deleteEvent = asyncHandler(async (req, res) => {
    const eventId = req.params;

    const event = await Event.findById(eventId);

    if (!event) {
        throw new apiError(404, "Event not found");
    }

    await Event.findByIdAndDelete(eventId);


    res.status(201).json({
        success: true,
    });
})

export {
    getAllEvents,
    getOneEvent,
    createEvent,
    updateEvent,
    deleteEvent
}


