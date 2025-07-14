import React from "react"

export default function SubjectsSection() {
  const subjects = [
    "Mathematics",
    "Science",
    "Programming",
    "English",
    "History",
    "Physics",
    "Chemistry",
    "Biology",
    "Economics",
    "Psychology",
  ]

  return (
    <section id="subjects" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            All <span className="text-purple-400">Subjects</span> Covered
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            From elementary to graduate level, we support learning across all major academic subjects
          </p>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {subjects.map((subject, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4 text-center hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
            >
              <div className="text-lg font-semibold text-white">{subject}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
