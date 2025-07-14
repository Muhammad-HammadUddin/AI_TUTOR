import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js"; // 🔁 Make sure this path is correct

export const verifyToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("I am auth Header",authHeader)

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Authorization token missing or invalid");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)

    // ✅ Check if user exists in DB
    // const user = await User.findById(decoded.id).select("-password");
    // console.log(user)
    
    // Exclude password
    // if (!user) {
    //   throw new ApiError(StatusCodes.UNAUTHORIZED, "User not found or removed");
    // }

    
    req.user = decoded.id;
    next();
  } catch (error) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid or expired token");
  }
});
