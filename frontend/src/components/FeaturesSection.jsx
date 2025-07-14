import React from "react"
import {
  Brain,
  Target,
  Lightbulb,
  Clock,
  BookOpen,
  TrendingUp
} from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-purple-400" />,
      title: "Adaptive Learning",
      description:
        "AI adjusts to your learning style, pace, and knowledge level for personalized education.",
    },
    {
      icon: <Target className="w-8 h-8 text-green-400" />,
      title: "Interactive Quizzes",
      description:
        "Test your knowledge with AI-generated quizzes tailored to your learning progress.",
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-yellow-400" />,
      title: "Smart Explanations",
      description:
        "Get detailed, step-by-step explanations for complex concepts in any subject.",
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-400" />,
      title: "24/7 Availability",
      description:
        "Learn anytime, anywhere with your AI tutor always ready to help.",
    },
    {
      icon: <BookOpen className="w-8 h-8 text-orange-400" />,
      title: "Multi-Subject Support",
      description:
        "From mathematics to programming, get help across all academic subjects.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-pink-400" />,
      title: "Progress Tracking",
      description:
        "Monitor your learning journey with detailed analytics and insights.",
    },
  ]

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="text-purple-400">AI Tutor</span>?
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Our advanced AI technology provides personalized learning experiences that adapt to your unique needs and
            learning style.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 rounded-xl p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-slate-700/50 rounded-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="text-slate-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
