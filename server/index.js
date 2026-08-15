// import dns from "dns";
import app from "./app.js";
import dotenv from "dotenv"; 
import connectDB from "./db/db.config.js";
import Razorpay from "razorpay"



dotenv.config({
    path:'./.env'
});

export const razorPayInstance = new Razorpay(
    {
        key_id:process.env.RAZOR_API_KEY,
        key_secret:process.env.RAZOR_API_SECRET_KEY
    }
);

connectDB()
.then(() => {
    const PORT = process.env.PORT || 5000;  
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch((err) => {
    console.log("DB connection error", err);
    process.exit(1);
});