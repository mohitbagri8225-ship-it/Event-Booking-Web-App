import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

//intialize express app
const app = express();
 
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());//parse incoming JSON requests
app.use(cookieParser());//parse incoming cookies
app.use(express.urlencoded({ extended: true }));//parse incoming URL-encoded requests

//Routes
import authRoutes from './routes/auth.routes.js';
import eventRoutes from './routes/events.routes.js';
import bookingRoutes from './routes/booking.routes.js';
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/events', eventRoutes);

export default app;