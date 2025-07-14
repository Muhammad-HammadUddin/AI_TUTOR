

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUser } from "../context/Auth.jsx";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
 const {login,setLogin}=useUser();
  const navigate=useNavigate();
  return (
    <nav className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
         
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-600/20 rounded-lg">
             
              <span className="text-purple-400 text-xl">🤖</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Tutor
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-300 hover:text-white transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-slate-300 hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#previous-questions" className="text-slate-300 hover:text-white transition-colors">
              Questions
            </a>
            
           
           {!login  && <button className="border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-4 py-2 rounded" onClick={()=>navigate("/login")}>
              Login
            </button>}
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded" onClick={()=>login?navigate("/ai-tutor"):navigate("/login")}>
              Get Started
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 rounded hover:bg-slate-700"
            >
              {isMobileMenuOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <a href="#features" className="block text-slate-300 hover:text-white transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="block text-slate-300 hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#previous-questions" className="block text-slate-300 hover:text-white transition-colors">
              Questions
            </a>
           
           
            <div className="flex flex-col gap-2 pt-4">
              {!login && <button className="border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-4 py-2 rounded" onClick={()=>navigate("/login")}>
                Login
              </button>}
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded" onClick={()=>{
                login?navigate("/ai-tutor"):navigate("/login")
              }}>
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
