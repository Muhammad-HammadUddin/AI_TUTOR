import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
   subject:{
    type:String,
    required:true  
  },
  learningLevel:{
      type:String,
    required:true
  },
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

export const Question = mongoose.model("Question", questionSchema);
