import express from "express";
import {generateAnswer,  generateQuiz } from "../controllers/aiController.js";
import { fetchQuestions,fetchSingleQuestion } from "../controllers/questionController.js";
import { verifyToken } from "../middlewares/veriifyToken.js";

const app = express();


app.post("/question",verifyToken,generateAnswer);
app.get("/all-question",fetchQuestions);
app.post("/single-question",fetchSingleQuestion)
app.post("/quiz",verifyToken,generateQuiz)
export default app;