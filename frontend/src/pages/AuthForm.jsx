"use client"

import React, { useState } from "react"
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Bot
} from "lucide-react"
import axiosInstance from "../../utils/axios.js"
import { API_PATH } from './../../utils/apiPath.js';
 import { toast } from "react-toastify"
import { useUser } from "../context/Auth.jsx";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: ""
  })
 const location = useLocation()
const navigate = useNavigate()
  const {setUser,setLogin}=useUser();
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: ""
  })

  useEffect(() => {
     if (location.pathname === "/login") {
    setIsLogin(true)
  } else if (location.pathname === "/register") {
    setIsLogin(false)
  }
  
   
  }, [location.pathname])
  

  const validateForm = () => {
    const newErrors = { email: "", username: "", password: "" }
    let isValid = true

    if (!formData.email) {
      newErrors.email = "Email is required"
      isValid = false
    }

    if (!isLogin) {
      if (!formData.username) {
        newErrors.username = "Username is required"
        isValid = false
      }
    }

    setErrors(newErrors)
    return isValid
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }




const handleSubmit = async (e) => {
  e.preventDefault()

  if (!validateForm()) return
  setIsLoading(true)

  try {
    const userData = isLogin
      ? {
          email: formData.email,
          password: formData.password
        }
      : {
          email: formData.email,
          username: formData.username,
          password: formData.password
        }

    const endpoint = isLogin
      ? API_PATH.AUTH.LOGIN_USER
      : API_PATH.AUTH.REGISTER_USER

    const response = await axiosInstance.post(endpoint, userData)

    if (response?.data?.success) {
      toast.success(response.data.message || "Success")

      const currentUser = response.data.data
     
      setUser(currentUser)
      setLogin(true) 

      localStorage.setItem("user", JSON.stringify(currentUser))
     
      navigate("/");
      

      setFormData({
        email: "",
        username: "",
        password: ""
      })
      
    } else {
      toast.error(response?.data?.message || "Something went wrong")
    }
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Unexpected error occurred"
    toast.error(message)
    console.error("Auth error:", message)
  } finally {
    setIsLoading(false)
  }
}

  const toggleMode = () => {
  
    const newMode=!isLogin
    setIsLogin(!isLogin)
    setErrors({ email: "", username: "", password: "" })
    setFormData({ email: "", username: "", password: "" })
    navigate(newMode ? "/login" : "/register")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 shadow-2xl rounded-xl">
        <div className="text-center space-y-4 p-6">
          <div className="flex items-center justify-center">
            <div className="p-3 bg-purple-600/20 rounded-full">
              <Bot className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {isLogin ? "Welcome Back" : "Join AI Tutor"}
          </h2>
          <p className="text-slate-400">
            {isLogin ? "Sign in to continue your learning journey" : "Create your account to start learning"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-200 flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400" /> Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 text-white placeholder:text-slate-400 rounded-md focus:outline-none focus:border-purple-500"
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200 flex items-center gap-2">
                <User className="w-4 h-4 text-green-400" /> Username
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                placeholder="Choose a username"
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 text-white placeholder:text-slate-400 rounded-md focus:outline-none focus:border-purple-500"
              />
              {errors.username && <p className="text-red-400 text-sm">{errors.username}</p>}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-200 flex items-center gap-2">
              <Lock className="w-4 h-4 text-yellow-400" /> Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Enter your password"
                className="w-full px-3 py-2 pr-10 bg-slate-700/50 border border-slate-600 text-white placeholder:text-slate-400 rounded-md focus:outline-none focus:border-purple-500"
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-slate-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-md shadow-md"
          >
            {isLoading ? (
              <span className="flex justify-center items-center">
                <span className="animate-spin h-5 w-5 border-b-2 border-white rounded-full mr-2"></span>
                {isLogin ? "Signing In..." : "Creating Account..."}
              </span>
            ) : (
              <span className="flex justify-center items-center">
                {isLogin ? "Sign In" : "Create Account"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </span>
            )}
          </button>

          {isLogin && (
            <div className="text-center">
              <button type="button" className="text-purple-400 hover:text-purple-300 text-sm">
                Forgot your password?
              </button>
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-slate-800 px-4 text-slate-400">
                {isLogin ? "New to AI Tutor?" : "Already have an account?"}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleMode}
            className="w-full border border-slate-600 bg-slate-700/30 text-slate-200 hover:bg-slate-700/50 hover:text-white py-2 rounded-md"
          >
            <span className="flex justify-center items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isLogin ? "Create New Account" : "Back to Sign In"}
            </span>
          </button>

          {!isLogin && (
            <p className="text-xs text-slate-400 text-center">
              By creating an account, you agree to our {" "}
              <button className="text-purple-400 hover:text-purple-300 p-0 h-auto text-xs underline">
                Terms of Service
              </button>{" "}
              and {" "}
              <button className="text-purple-400 hover:text-purple-300 p-0 h-auto text-xs underline">
                Privacy Policy
              </button>
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
