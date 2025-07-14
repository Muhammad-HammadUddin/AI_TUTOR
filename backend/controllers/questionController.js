import mongoose from "mongoose"
import { Question } from "../models/questionModel.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { StatusCodes } from "http-status-codes"
import { ApiResponse } from "../utils/apiResponse.js"

export const fetchQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find().sort({ createdAt: -1 }).limit(6)

  if (!questions || questions.length === 0) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "No questions found")
  }

  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse(200, "Latest questions fetched",questions))
})


export const fetchSingleQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.body.id);


  if (!question ) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "No questions found")
  }

  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse(200, "Latest questions fetched",question))
})
