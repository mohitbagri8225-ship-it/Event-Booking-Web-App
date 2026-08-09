import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import ApiError from "../utils/apiError.js"

const verifyJwt = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization || req.cookies.token;

    if (!authHeader) {
        throw new ApiError(401, "Unauthorized request");
    }

    const token = authHeader.replace("Bearer ", "");

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedToken.id).select("-password -refreshToken");

    if (!user) {
        throw new ApiError(401, "Invalid access token");
    }

    req.user = user;
    next();
});

export { verifyJwt };