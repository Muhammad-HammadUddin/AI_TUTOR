"use client"
import { useEffect, useState } from "react"
import { Bot, BookOpen, Brain, Lightbulb, Clock, Target,LoaderPinwheel } from "lucide-react"
import { toast } from "react-toastify"
import axiosInstance from "../../utils/axios"
import { API_PATH } from "../../utils/apiPath"
import { useAnswer } from './../context/ResponseContext.jsx';
import ExplanationDisplay from "../components/ExplanationDisplay.jsx"
import { useUser } from "../context/Auth.jsx"
import KnowledgeCard from "../components/KnowledgeCard.jsx"
import { useNavigate } from "react-router-dom"

export default function AiTutor() {
  const [question, setQuestion] = useState("")
  const [subject, setSubject] = useState("")
  const [gradeLevel, setGradeLevel] = useState("")
  const [learningLevel, setLearningLevel] = useState("")
  const [explanation,setExplanation]=useState(false);
  const [taskSpeed, setTaskSpeed] = useState("")
  const [taskSession, setTaskSession] = useState("")
  const [answer,setAnswer]=useState('')
  const [isLoading,setIsLoading]=useState(false)
 

  const {setAnswerResponse,setQuiz, }=useAnswer()
  const {token}=useUser()
  const navigate=useNavigate()
  console.log(token)
  

  useEffect(() => {
  if (token) {
    console.log("Token inside Answer context:", token);
  }
}, [token]);

  const commonSelectClass = "bg-slate-700/50 border border-slate-600 text-white rounded px-3 py-2 w-full"
  const handleInput=()=>{
     if (
    !question.trim() ||
    !subject ||
    !gradeLevel ||
    !learningLevel ||
    !taskSpeed ||
    !taskSession){
      return  toast.error("Select all learning preferences")
    }
    else{
      fetchAnswer();
    }

    
  }


  const fetchAnswer=async ()=>{
    try {
      const learningPreference={
      question,
      subject,
        gradeLevel,
        learningLevel,
        taskSpeed,
        taskSession,
    }
    setIsLoading(true);


      const response = await axiosInstance.post(API_PATH.AI.ASK_QUESTION,learningPreference,{
        headers:{
          Authorization:`Bearer ${token}`}
      });
      if(response?.data && response?.data?.data){
        // console.log(response?.data?.data[0].answer)
        console.log(response?.data.message.answer);
        setAnswerResponse(response?.data?.data.answer)
        setAnswer(response?.data?.data.answer)
        setExplanation(true);
        setIsLoading(false)
      }
      
    } catch (error) {
      toast.error(error.message);
      console.log(error)
      
    }

  }

  const handleStartQuiz=async()=>{
try {
  setIsLoading(true);
  const Quiz={
    userQuestion:question,
    numberOfQuestions:3,
    difficultyLevel:learningLevel,
    subject
  }

  const res=await axiosInstance.post(API_PATH.AI.QUIZ,Quiz,{
    headers:{
      Authorization:`Bearer ${token}` 
    }
  })

  console.log(res?.data);
  setQuiz(res?.data)
  setIsLoading(false)
} catch (error) {
  console.log(error);
  toast.error(error.message);
  
}
     navigate("/quiz");
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="grid lg:grid-cols-[320px_1fr] min-h-screen">
        {/* Sidebar */}
        <aside className="bg-slate-800/50 backdrop-blur-sm border-r border-slate-700/50 p-6">
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-8">
              <Bot className="w-6 h-6 text-purple-400" />
              <h2 className="text-lg font-semibold">Learning Preferences</h2>
            </div>

            <div className="space-y-4">
              {/* Subject */}
              <div>
                <label className="text-sm font-medium flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  Subject
                </label>
                <select value={subject} onChange={(e) => setSubject(e.target.value)} className={commonSelectClass}>
                  <option value="">Select Subject</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="science">Science</option>
                  <option value="english">English</option>
                  <option value="history">History</option>
                  <option value="programming">Programming</option>
                </select>
              </div>

              {/* Grade Level */}
              <div>
                <label className="text-sm font-medium flex items-center gap-2">
                  <Target className="w-4 h-4 text-green-400" />
                  Grade Level
                </label>
                <select value={gradeLevel} onChange={(e) => setGradeLevel(e.target.value)} className={commonSelectClass}>
                  <option value="">Select Grade</option>
                  <option value="elementary">Elementary (K-5)</option>
                  <option value="middle">Middle School (6-8)</option>
                  <option value="high">High School (9-12)</option>
                  <option value="college">College</option>
                  <option value="graduate">Graduate</option>
                </select>
              </div>

              {/* Learning Level */}
              <div>
                <label className="text-sm font-medium flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-400" />
                  Subject Learning Level
                </label>
                <select value={learningLevel} onChange={(e) => setLearningLevel(e.target.value)} className={commonSelectClass}>
                  <option value="">Select Level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>

              {/* Learning Style */}
             

              {/* Task Speed */}
              <div>
                <label className="text-sm font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-400" />
                  Task Speed
                </label>
                <select value={taskSpeed} onChange={(e) => setTaskSpeed(e.target.value)} className={commonSelectClass}>
                  <option value="">Select Speed</option>
                  <option value="slow">Slow & Detailed</option>
                  <option value="medium">Medium Pace</option>
                  <option value="fast">Fast & Concise</option>
                </select>
              </div>

              {/* Task Session */}
              <div>
                <label className="text-sm font-medium">Task Session</label>
                <select value={taskSession} onChange={(e) => setTaskSession(e.target.value)} className={commonSelectClass}>
                  <option value="">Select Duration</option>
                  <option value="1min">1 minute</option>
                  <option value="2min">2 minutes</option>
                  <option value="3min">3 minutes</option>
                  <option value="5min">5 minutes</option>
                </select>
              </div>

              {/* Hands-on Toggle */}
             

              <div className="pt-2 text-sm text-slate-400">
                <span className="text-green-400">●</span> Beginner
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex flex-col">
          <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="p-3 bg-purple-600/20 rounded-full">
                    <Bot className="w-8 h-8 text-purple-400" />
                  </div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    AI-Powered Tutor & Quiz
                  </h1>
                </div>
                <p className="text-slate-400 text-lg">Your intelligent learning companion for personalized education</p>
              </div>

              {/* Question Box */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-8 shadow-2xl">
                <h2 className="text-2xl font-semibold text-center text-white mb-2">Ask Your Question</h2>
                <p className="text-center text-slate-400 mb-6">Explore Newton's Second Law of Motion</p>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Type your question here..."
                  className="w-full min-h-[120px] p-4 bg-slate-700/50 border border-slate-600 text-white placeholder:text-slate-400 resize-none rounded text-lg"
                />
                <div className="text-center mt-6">
                  <button
                    disabled={!question.trim()}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-lg px-8 py-3 rounded shadow-lg hover:shadow-xl disabled:opacity-50 transition-all"
                    onClick={handleInput}
                  >
                    Get Explanation ✨
                  </button>
                  {isLoading&&<LoaderPinwheel className="w-12 h-12 text-purple-400 mx-auto mb-4 animate-spin" />}
                </div>
              </div>
                  {explanation && (
                <div className="mt-8">
                  <ExplanationDisplay answer={answer} />
                </div>)}
                {explanation && (
                  <div className="mt-8">
                    <KnowledgeCard handleStartQuiz={handleStartQuiz} isLoading={isLoading}/>
                  </div>
                )}

              {/* Features */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                {[
                  { icon: <Brain className="w-12 h-12 text-purple-400 mx-auto mb-4" />, title: "Adaptive Learning", desc: "Personalized explanations based on your learning style and level" },
                  { icon: <Target className="w-12 h-12 text-green-400 mx-auto mb-4" />, title: "Interactive Quizzes", desc: "Test your knowledge with AI-generated practice questions" },
                  { icon: <Lightbulb className="w-12 h-12 text-yellow-400 mx-auto mb-4" />, title: "Smart Insights", desc: "Get detailed explanations and step-by-step solutions" },
                ].map((feature, i) => (
                  <div key={i} className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 text-center rounded-lg p-6">
                    {feature.icon}
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-slate-400 text-sm">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center py-6 border-t border-slate-700/50">
            <p className="text-slate-400 text-sm">Powered by AI - Your Personal Learning Assistant</p>
          </footer>
        </main>
      </div>
    </div>
  )
}
