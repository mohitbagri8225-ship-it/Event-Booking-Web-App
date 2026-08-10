import express from 'express';
import { admin, verifyJwt } from "../middleware/auth.middleware.js"
import { bookEvent, getMyBookings, confirmBooking, cancelBooking, sendBookingOtp } from "../controller/booking.controller.js"

const router = express.Router();

router.post('/', verifyJwt, bookEvent);
router.get('/my', verifyJwt, getMyBookings);
router.put('/:id/confirm', verifyJwt, admin, confirmBooking);
router.delete('/:id', verifyJwt, admin, cancelBooking);
router.post('/send-otp', verifyJwt, sendBookingOtp);

export default router;