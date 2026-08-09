import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
 
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Routes
import authRoutes from './routes/auth.routes.js';
app.use('/api/auth', authRoutes);

export default app;