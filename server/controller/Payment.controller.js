import { asyncHandler } from "../utils/asyncHandler.js";
import { razorPayInstance } from "../index.js";

 const checkOut = async (req,res)=>{
    const options = {
        amount:500,
        currency:"INR",
    };

    const order = await razorPayInstance.orders.create(options);
    console.log(order);
    res.status(200).json({success:true})
}

export {
    checkOut
}