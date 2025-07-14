import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // 🔁 You forgot this
import jwt from "jsonwebtoken"; // 🔁 You forgot this

import User from "../models/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { StatusCodes } from "http-status-codes";

// ✅ Token Generator
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "3d",
  });
};

// ✅ REGISTER CONTROLLER
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Missing required fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError(StatusCodes.CONFLICT, "Email already exists");
  }

  // ✅ Password hash
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  await newUser.save();

 
  const data = {
    _id: newUser._id,
    username: newUser.username,
    email: newUser.email,
    
  };

  return res
    .status(StatusCodes.CREATED)
    .json(new ApiResponse(StatusCodes.CREATED, "Registration Successful", data));
});


export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Email and password are required"
    );
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
  }

  const data = {
    _id: user._id,
    username: user.username,
    email: user.email,
    token: generateToken(user._id),
  };

  return res
    .status(StatusCodes.OK)
    .send(new ApiResponse(StatusCodes.OK, "Login Successful", data));
});
