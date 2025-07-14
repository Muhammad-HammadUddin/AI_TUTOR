import dotenv from "dotenv"
import { GoogleGenAI } from "@google/genai";
import {ApiError} from  "../utils/apiError.js"
import {ApiResponse} from  "../utils/apiResponse.js"
import {asyncHandler} from  "../utils/asyncHandler.js"
import { questionAnswerPrompt, quizPrompt } from "../utils/prompts.js";
import { responseMessages } from './../constant/responseMessages.js';
import { StatusCodes } from "http-status-codes";
import { Question } from "../models/questionModel.js";
//  import textToSpeech from "../connections/elevenLab.js";

const { MISSING_FIELDS, UPDATE_UNSUCCESS_MESSAGES } = responseMessages

dotenv.config();


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});
console.log(process.env.GEMINI_API_KEY)
// Generate answer of Question
// /questions/add

 // wherever your prompt fn is

export const generateAnswer = asyncHandler(async (req, res) => {
  const {
    subject,
    gradeLevel,
    learningLevel,
    taskSpeed,
    taskSession,
    question,
  } = req.body;

  if (
    !question ||
    !subject ||
    !gradeLevel ||
    !learningLevel ||
    !taskSpeed ||
    !taskSession
  ) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Missing required fields");
  }

  const prompt = questionAnswerPrompt(
    subject,
    gradeLevel,
    learningLevel,
    taskSpeed,
    taskSession,
    question
  );

  const response = await ai?.models?.generateContent({
    model: "gemini-2.0-flash-lite",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  let rawText = response?.text;

  if (!rawText) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "No response from AI");
  }
 console.log("I am req.user",req.user)
  const cleanedText = rawText
    .replace(/^```json\s*/, "") // remove starting ```json
    .replace(/```$/, "") // remove ending ```
    .trim();

  let data;

  try {
    data = JSON.parse(cleanedText);
  } catch (err) {
    console.error("JSON parse error:", cleanedText);
    throw new ApiError(StatusCodes.BAD_REQUEST, "AI response is not valid JSON");
  }

  if (!Array.isArray(data) || !data[0]?.question || !data[0]?.answer) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "AI response format incorrect");
  }
  
  const newQuestion = await Question.create({
    question: data[0].question,
    answer: data[0].answer,
    subject,
    learningLevel,
    user: req.user,
  });

  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK,"Answer generated and saved", newQuestion ));
});

export const generateQuiz=asyncHandler(async(req,res)=>{
   const {
    userQuestion,numberOfQuestions,difficultyLevel,subject
  } = req.body;
 console.log("I am req.body",req.body)
  if (
   !userQuestion ||
    !numberOfQuestions ||
    !difficultyLevel ||
    !subject 
   
  ) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Missing required fields");
  }

  const prompt = quizPrompt(
     userQuestion,numberOfQuestions,difficultyLevel,subject
  );

  const response = await ai?.models?.generateContent({
    model: "gemini-2.0-flash-lite",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  let rawText = response?.text;

  if (!rawText) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "No response from AI");
  }
 console.log("I am req.user",req.user)
  const cleanedText = rawText
    .replace(/^```json\s*/, "") // remove starting ```json
    .replace(/```$/, "")
    .trim();

  let data;

  try {
    data = JSON.parse(cleanedText);
  } catch (err) {
    console.error("JSON parse error:", cleanedText);
    throw new ApiError(StatusCodes.BAD_REQUEST, "AI response is not valid JSON");
  }

 

  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK,"Quiz", data ));

})



export default generateAnswer