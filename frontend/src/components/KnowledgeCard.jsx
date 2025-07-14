import React from "react"
import { Brain, LoaderPinwheel } from "lucide-react"

export default function KnowledgeCard({handleStartQuiz,isLoading}) {
  return (
    <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-sm border border-green-500/30 rounded-2xl mt-8 shadow-lg">
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Left: Icon and Text */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-600/20 rounded-full">
              <Brain className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Ready to Test Your Knowledge?
              </h3>
              <p className="text-slate-300">
                Take a quiz on photosynthesis to reinforce what you've learned and test your understanding!
              </p>
            </div>
          </div>

          {/* Right: Start Quiz Button */}
          <button
             onClick={handleStartQuiz}
            className="flex items-center bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-xl transition-all duration-200"
          >
            <Brain className="w-10 h-5 mr-2" />

            Start Quiz
            {isLoading&&<LoaderPinwheel className="w-5 h-5 animate-spin"/>}
          </button>
        </div>
      </div>
    </div>
  )
}
