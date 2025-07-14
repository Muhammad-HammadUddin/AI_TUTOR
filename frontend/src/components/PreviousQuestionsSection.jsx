import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import axiosInstance from "../../utils/axios.js";
import { API_PATH } from "../../utils/apiPath.js";
import { toast } from "react-toastify";
import {formatDistanceToNow } from "date-fns"
import { useNavigate } from 'react-router-dom';
 // Enable "fromNow()" formatting

export default function PreviousQuestionsSection() {
  const [questions, setQuestions] = useState([]);
  const navigate=useNavigate()

  const fetchAllQuestions = async () => {
    try {
      const res = await axiosInstance.get(API_PATH.AI.ALL_QUESTION);
      if (res?.data?.data) {
        setQuestions(res.data.data);
        
      } else {
        toast.error("No previous questions found.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to fetch questions.");
    }
  };

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  const getSubjectColor = (subject) => {
    switch (subject) {
      case "Mathematics":
        return "bg-blue-600/20 text-blue-300";
      case "Biology":
        return "bg-green-600/20 text-green-300";
      case "Programming":
        return "bg-purple-600/20 text-purple-300";
      case "Physics":
        return "bg-orange-600/20 text-orange-300";
      default:
        return "bg-teal-600/20 text-teal-300";
    }
  };

  const handleClick=(id)=>{
    navigate(`/question/${id}`)
    
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "beginner":
        return "border border-green-500 text-green-400";
      case "intermediate":
        return "border border-yellow-500 text-yellow-400";
      case "expert":
        return "border border-red-500 text-red-400";
      default:
        return "border border-gray-500 text-gray-400";
    }
  };

  return (
    <section id="previous-questions" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Recently Asked <span className="text-purple-400">Questions</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            See what other students are learning about. Get inspired by popular questions and topics.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {questions.map((item, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 rounded-xl p-6 cursor-pointer group"

              onClick={()=>handleClick(item._id)}
            >
              {/* Subject and Difficulty */}
              <div className="flex items-start justify-between mb-3 text-xs">
                <span className={`px-2 py-1 rounded-full font-medium ${getSubjectColor(item.subject)}`}>
                  {item.subject}
                </span>
                <span className={`px-2 py-1 rounded-full font-medium ${getDifficultyColor(item.learningLevel)}`}>
                  {item.learningLevel}
                </span>
              </div>

              {/* Question */}
              <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors">
                {item.question}
              </h3>

              {/* Time and Likes */}
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span> {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
