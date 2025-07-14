import React from "react"

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It <span className="text-purple-400">Works</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Get started with AI Tutor in just three simple steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-white">Ask Your Question</h3>
            <p className="text-slate-300">
              Simply type your question or upload your homework. Our AI understands natural language and complex
              problems.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-white">Get Personalized Help</h3>
            <p className="text-slate-300">
              Receive detailed explanations tailored to your learning level and style. Visual, auditory, or hands-on – 
              we adapt to you.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-white">Practice & Master</h3>
            <p className="text-slate-300">
              Take interactive quizzes and practice problems to reinforce your learning and track your progress.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
