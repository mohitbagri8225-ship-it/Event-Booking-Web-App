// import dns from "dns";
import app from "./app.js";
import dotenv from "dotenv"; 
import connectDB from "./db/db.config.js";



dotenv.config({
    path:'./.env'
});

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