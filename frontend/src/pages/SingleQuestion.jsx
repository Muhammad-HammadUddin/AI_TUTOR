import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ArrowLeft } from 'lucide-react'

import axiosInstance from '../../utils/axios'
import { API_PATH } from '../../utils/apiPath'
import ExplanationDisplay from '../components/ExplanationDisplay'

export default function SingleQuestion() {
  const { id } = useParams()
  const [answer, setAnswer] = useState('')
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchSingleQuestion = async () => {
    try {
      const res = await axiosInstance.post(API_PATH.AI.SINGLE_QUESTION, { id })
      const result = res?.data?.data
      setAnswer(result?.answer)
      setQuestion(result?.question)
    } catch (error) {
      console.error(error)
      toast.error(error.message || 'Failed to fetch question.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSingleQuestion()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div className="text-left">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-700 hover:bg-purple-600 text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Question Card */}
        <div className="bg-slate-800/50 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-slate-700">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-purple-300">📌 Question</h1>
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : question ? (
            <p className="text-lg text-slate-200">{question}</p>
          ) : (
            <p className="text-red-400">Question not found.</p>
          )}
        </div>

        {/* Answer Card */}
        {answer && (
          <div className="bg-purple-950/30 border border-purple-700 p-6 rounded-2xl shadow-lg transition-all">
            <h2 className="text-xl font-semibold text-purple-300 mb-4">✅ AI Answer</h2>
            <ExplanationDisplay answer={answer} />
          </div>
        )}
      </div>
    </div>
  )
}
