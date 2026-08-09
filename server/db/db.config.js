import mongoose from "mongoose"; 
import dotenv from "dotenv";
import { DB_NAME, DB_URI } from "../constant.js";

dotenv.config();

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      process.env.DB_URI || DB_URI,
      {
        dbName:DB_NAME
      }
    );

    console.log(`MongoDB connected: ${connectionInstance.connection.host}`);

  } catch (err) {
    console.log("MongoDB connection ERROR", err);
    process.exit(1);
  }
};

export default connectDB;