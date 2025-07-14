import express from "express";
import {registerUser,loginUser} from "../controllers/userController.js";

const app = express();


app.post("/login",loginUser);
app.post("/register",registerUser)
export default app;