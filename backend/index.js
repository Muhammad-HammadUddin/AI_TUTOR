import express from "express";
import cors from "cors";
import connectDB from "./connections/connectDb.js";
import questionRouter from "./routes/questionRoutes.js";
import userRouter from "./routes/userRouter.js";

const app = express();

// ✅ Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());

// ✅ Connect to DB
connectDB().catch((err) => {
  console.error("❌ DB connection failed:", err);
  process.exit(1);
});

// ✅ Routes
app.use("/ai", questionRouter);
app.use("/user", userRouter);

// ✅ Health Check Route
app.get("/", (req, res) => {
  res.json("✅ Server is running");
});

// ✅ Error Handler (always at the end)
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message || "Something went wrong",
    status: error.status,
    stack: error.stack,
  });
});

// ❌ DO NOT use app.listen() on Vercel

// ✅ Export the Express app for Vercel Serverless Function
export default app;
