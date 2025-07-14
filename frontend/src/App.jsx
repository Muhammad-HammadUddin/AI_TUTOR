import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AuthForm from "./pages/AuthForm"
import AiTutor from "./pages/AiTutor"
import HomePage from "./pages/HomePage"
import SingleQuestion from "./pages/SingleQuestion"
import QuizPage from "./pages/QuizPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthForm />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<AuthForm />} />
        <Route path="/ai-tutor" element={<AiTutor />} />
        <Route path="/question/:id" element={<SingleQuestion />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>

      
    </Router>
  )
}

export default App
