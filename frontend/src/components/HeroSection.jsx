import React from "react"
import { ArrowRight, Play } from "lucide-react"
import { useUser } from "../context/Auth.jsx"
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const {login}=useUser();
  const navigate=useNavigate()
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* Badge */}
        <div className="mb-8">
          <span className="inline-block bg-purple-600/20 text-purple-300 border border-purple-500/30 rounded-full px-4 py-1 mb-4 text-sm font-medium">
            🚀 Powered by Advanced AI
          </span>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Your Personal
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              AI Tutor
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Experience personalized learning like never before. Get instant explanations, interactive quizzes, and
            adaptive tutoring across all subjects.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-8 py-4 rounded-md flex items-center justify-center" onClick={()=>login?navigate("/ai-tutor"):navigate("/login")}>
            Start Learning Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
         
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">50K+</div>
            <div className="text-slate-400">Active Students</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">95%</div>
            <div className="text-slate-400">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">24/7</div>
            <div className="text-slate-400">Availability</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-400">10+</div>
            <div className="text-slate-400">Subjects</div>
          </div>
        </div>
      </div>
    </section>
  )
}
