"use client"

import { useState } from "react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { BookOpen, CheckCircle, Copy, Lightbulb } from "lucide-react"
// import { useAnswer } from "../context/ResponseContext"

export default function ExplanationDisplay({answer}) {
  const [copiedCode, setCopiedCode] = useState(null)
  // const { answerResponse } = useAnswer()
 console.log(answer)
  if (!answer ) {
    return <div className="text-white">Loading...</div>
  }

 
  const explanation=answer

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCode(id)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error("❌ Failed to copy text:", err)
    }
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 shadow-lg rounded-xl p-6">
      <div className="flex items-center gap-2 text-white text-2xl mb-4">
        <span className="bg-green-600/20 p-2 rounded-full">
          <Lightbulb className="text-green-400 w-6 h-6" />
        </span>
        <span className="font-semibold">AI Explanation</span>
      </div>

      <div className="prose prose-invert prose-purple max-w-none">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold text-purple-300 border-b border-slate-600 mb-6 pb-2">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl font-semibold text-purple-400 mt-8 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                {children}
              </h2>
            ),
            h3: ({ children }) => <h3 className="text-xl font-semibold text-blue-300 my-4">{children}</h3>,
            p: ({ children }) => <p className="text-slate-200 leading-relaxed mb-4">{children}</p>,
            ul: ({ children }) => <ul className="text-slate-200 space-y-2 mb-4">{children}</ul>,
            ol: ({ children }) => (
              <ol className="list-decimal list-inside text-slate-200 space-y-2 mb-4">{children}</ol>
            ),
            li: ({ children }) => (
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                <span>{children}</span>
              </li>
            ),
            strong: ({ children }) => <strong className="text-purple-300 font-semibold">{children}</strong>,
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-purple-500 bg-purple-900/20 p-4 rounded-r-lg my-6">
                <span className="text-purple-200 italic">{children}</span>
              </blockquote>
            ),
            code: ({ children, className }) => {
              if (!className) {
                return (
                  <code className="bg-slate-700 text-purple-300 px-2 py-1 rounded text-sm font-mono">
                    {String(children)}
                  </code>
                )
              }
              return <code className={className}>{children}</code>
            },
            pre: ({ children, ...props }) => {
              const match = /language-(\w+)/.exec(props.className || "")
              const language = match ? match[1] : "text"
              const codeString = String(children).replace(/\n$/, "")
              const codeId = `code-${Math.random().toString(36).slice(2, 10)}`

              return (
                <div className="relative group mb-6">
                  <div className="flex justify-between items-center bg-slate-900 px-4 py-2 rounded-t-lg border border-slate-600">
                    <span className="text-sm font-mono text-slate-400">{language}</span>
                    <button
                      onClick={() => copyToClipboard(codeString, codeId)}
                      className="text-slate-400 hover:text-white text-sm px-2 py-1 rounded"
                    >
                      {copiedCode === codeId ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <SyntaxHighlighter
                    language={language}
                    style={oneDark}
                    PreTag="div"
                    className="!mt-0 !rounded-t-none border-x border-b border-slate-600"
                    customStyle={{
                      margin: 0,
                      background: "#0f172a",
                      borderRadius: "0 0 0.5rem 0.5rem",
                    }}
                  >
                    {codeString}
                  </SyntaxHighlighter>
                </div>
              )
            },
            table: ({ children }) => (
              <div className="overflow-x-auto my-6">
                <table className="w-full border-collapse border border-slate-600 rounded-lg">{children}</table>
              </div>
            ),
            th: ({ children }) => (
              <th className="border border-slate-600 bg-slate-700 px-4 py-2 text-left text-purple-300 font-semibold">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="border border-slate-600 px-4 py-2 text-slate-200">{children}</td>
            ),
          }}
        >
          {explanation}
        </ReactMarkdown>
      </div>
    </div>
  )
}
