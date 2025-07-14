import { useState, useEffect } from "react"
import { Brain, ArrowLeft, Home, CheckCircle, XCircle, Trophy, RotateCcw, ArrowRight } from "lucide-react"
import { useAnswer } from "../context/ResponseContext.jsx"
import { useUser } from "../context/Auth.jsx"
import { useNavigate } from "react-router-dom"

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [showResults, setShowResults] = useState(false)
  const { quiz } = useAnswer()
  const {token}=useUser();
  const navigate=useNavigate();

  useEffect(()=>{
    if(!token){
      navigate("/");
    }
    if(quiz==undefined){
      navigate("/")

    }
  })
  console.log(quiz)

  const quizData = quiz.data

  const handleAnswerSelect = (answerIndex) => {
    const updated = [...selectedAnswers]
    updated[currentQuestion] = answerIndex
    setSelectedAnswers(updated)
  }

  const handleNext = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion(prev => prev - 1)
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswers([])
    setShowResults(false)
  }

  if (!quizData || !quizData.questions || quizData.questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800  to-purple-900">
        <p className="text-lg text-slate-300">Loading quiz...</p>
      </div>
    )
  }

  const score = selectedAnswers.filter((a, i) => a === quizData.questions[i].correctAnswer).length
  const percentage = Math.round((score / quizData.questions.length) * 100)

  if (showResults) {
    return (
   <div className="min-h-screen bg-gradient-to-br from-slate-800 via-orange-400-700 to-purple-900">

        <div className="max-w-3xl mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => window.history.back()} className="text-sm px-4 py-2 border rounded text-slate-300 hover:bg-slate-700">
              <ArrowLeft className="inline w-4 h-4 mr-1" /> Back
            </button>
            <button onClick={() => (window.location.href = "/")} className="text-sm px-4 py-2 border rounded text-slate-300 hover:bg-slate-700">
              <Home className="inline w-4 h-4 mr-1" /> Home
            </button>
          </div>

          <h2 className="text-2xl font-bold text-center mb-4">Results</h2>
          <div className="text-center text-lg mb-6">
            Score: <span className="text-green-400 font-bold">{score}</span> / {quizData.questions.length} ({percentage}%)
          </div>

          {quizData.questions.map((q, i) => {
            const isCorrect = selectedAnswers[i] === q.correctAnswer
            return (
              <div key={q.id} className="mb-4 p-4 bg-slate-800 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="text-white font-semibold">Q{i + 1}. {q.question}</div>
                  {isCorrect ? (
                    <CheckCircle className="text-green-400 w-5 h-5" />
                  ) : (
                    <XCircle className="text-red-400 w-5 h-5" />
                  )}
                </div>
                <div className="mt-2 space-y-2">
                  {q.options.map((option, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded border text-sm ${
                        idx === q.correctAnswer ? "bg-green-600/20 text-green-300 border-green-500" :
                        idx === selectedAnswers[i] && !isCorrect ? "bg-red-600/20 text-red-300 border-red-500" :
                        "bg-slate-700 border-slate-600 text-slate-300"
                      }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-blue-300 text-sm">{q.explanation}</div>
              </div>
            )
          })}

          <div className="text-center mt-6">
            <button
              onClick={handleRestart}
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              <RotateCcw className="inline w-4 h-4 mr-1" /> Retake Quiz
            </button>
          </div>
        </div>
      </div>
    )
  }

  const q = quizData.questions[currentQuestion]

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">{quizData.title}</h1>
        <div className="mb-4 text-slate-400">
          Question {currentQuestion + 1} of {quizData.questions.length}
        </div>
        <div className="bg-slate-800 p-4 rounded-lg mb-6">
          <div className="text-lg font-semibold mb-4">{q.question}</div>
          <div className="space-y-3">
            {q.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(idx)}
                className={`w-full text-left px-4 py-2 rounded border ${
                  selectedAnswers[currentQuestion] === idx
                    ? "bg-purple-600/20 border-purple-500 text-purple-300"
                    : "bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-slate-700"
          >
            <ArrowLeft className="inline w-4 h-4 mr-1" /> Previous
          </button>
          <button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {currentQuestion === quizData.questions.length - 1 ? (
              <><Trophy className="inline w-4 h-4 mr-1" /> Finish</>
            ) : (
              <>Next <ArrowRight className="inline w-4 h-4 ml-1" /></>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
