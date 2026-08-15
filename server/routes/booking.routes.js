import express from 'express';
import { admin, verifyJwt } from "../middleware/auth.middleware.js"
import { bookEvent, getMyBookings, confirmBooking, cancelBooking, sendBookingOtp } from "../controller/booking.controller.js"

const router = express.Router();

router.post('/book-event', verifyJwt, bookEvent);
router.get('/my',verifyJwt, getMyBookings);
router.post('/confirm', verifyJwt, confirmBooking);
// Allow users to cancel their own bookings; controller enforces ownership
router.delete('/:id', verifyJwt, cancelBooking);
router.post('/send-otp', verifyJwt, sendBookingOtp);

export default router;