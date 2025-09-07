'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowLeft, FiArrowRight, FiCheckCircle, FiClock } from 'react-icons/fi'
import axios from 'axios'

interface Question {
  id: string
  question: string
  options: string
  correct: number
  order: number
}

interface Module {
  id: string
  title: string
  description: string
  content: string
  duration: number
  questions: Question[]
}

interface ModuleViewerProps {
  module: Module
  userId: string
  initialProgress: any
}

export default function ModuleViewer({ module, userId, initialProgress }: ModuleViewerProps) {
  const [currentView, setCurrentView] = useState<'content' | 'quiz'>('content')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [key: string]: number }>({})
  const [showResults, setShowResults] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [quizScore, setQuizScore] = useState<number | null>(null)
  const router = useRouter()

  const content = JSON.parse(module.content || '[]')
  const questions = module.questions.map(q => ({
    ...q,
    options: JSON.parse(q.options)
  }))

  const handleStartQuiz = () => {
    setCurrentView('quiz')
    setCurrentQuestionIndex(0)
    setAnswers({})
    setShowResults(false)
    setQuizScore(null)
  }

  const handleSelectAnswer = (questionId: string, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const handleSubmitQuiz = async () => {
    setSubmitting(true)

    try {
      const response = await axios.post('/api/quiz/submit', {
        moduleId: module.id,
        answers: answers
      })

      setQuizScore(response.data.score)
      setShowResults(true)
    } catch (error) {
      console.error('Error submitting quiz:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const isQuizComplete = Object.keys(answers).length === questions.length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                <FiArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{module.title}</h1>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FiClock className="w-4 h-4" />
                  <span>{module.duration} minutes</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                currentView === 'content' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}>
                Content
              </div>
              <FiArrowRight className="w-4 h-4 text-gray-400" />
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                currentView === 'quiz' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}>
                Quiz
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {currentView === 'content' ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="card">
                <h2 className="text-2xl font-bold mb-4">{module.title}</h2>
                <p className="text-gray-600 mb-6">{module.description}</p>
                
                {/* Module Content */}
                <div className="prose max-w-none">
                  {content.map((section: any, index: number) => (
                    <div key={index} className="mb-8">
                      {section.type === 'heading' && (
                        <h3 className="text-xl font-semibold mb-3">{section.content}</h3>
                      )}
                      {section.type === 'paragraph' && (
                        <p className="text-gray-700 mb-4 leading-relaxed">{section.content}</p>
                      )}
                      {section.type === 'list' && (
                        <ul className="list-disc list-inside space-y-2 mb-4">
                          {section.items.map((item: string, i: number) => (
                            <li key={i} className="text-gray-700">{item}</li>
                          ))}
                        </ul>
                      )}
                      {section.type === 'highlight' && (
                        <div className="bg-blue-50 border-l-4 border-primary p-4 mb-4">
                          <p className="text-gray-800">{section.content}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Start Quiz Button */}
                <div className="mt-8 pt-8 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold">Ready to test your knowledge?</h4>
                      <p className="text-gray-600">Take the quiz to complete this module</p>
                    </div>
                    <button
                      onClick={handleStartQuiz}
                      className="btn-primary flex items-center gap-2"
                    >
                      Start Quiz
                      <FiArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {!showResults ? (
                <div className="card">
                  {/* Quiz Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                      <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Current Question */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-6">
                      {questions[currentQuestionIndex].question}
                    </h3>
                    <div className="space-y-3">
                      {questions[currentQuestionIndex].options.map((option: string, index: number) => {
                        const questionId = questions[currentQuestionIndex].id
                        const isSelected = answers[questionId] === index
                        
                        return (
                          <label
                            key={index}
                            className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              isSelected
                                ? 'border-primary bg-primary/5'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`question-${questionId}`}
                              checked={isSelected}
                              onChange={() => handleSelectAnswer(questionId, index)}
                              className="sr-only"
                            />
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                isSelected ? 'border-primary' : 'border-gray-300'
                              }`}>
                                {isSelected && (
                                  <div className="w-3 h-3 rounded-full bg-primary" />
                                )}
                              </div>
                              <span className="text-gray-700">{option}</span>
                            </div>
                          </label>
                        )
                      })}
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between">
                    <button
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestionIndex === 0}
                      className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiArrowLeft className="w-5 h-5" />
                      Previous
                    </button>
                    
                    {currentQuestionIndex === questions.length - 1 ? (
                      <button
                        onClick={handleSubmitQuiz}
                        disabled={!isQuizComplete || submitting}
                        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {submitting ? 'Submitting...' : 'Submit Quiz'}
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuestion}
                        className="btn-primary flex items-center gap-2"
                      >
                        Next
                        <FiArrowRight className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card text-center"
                >
                  <div className="mb-8">
                    {quizScore !== null && quizScore >= 70 ? (
                      <>
                        <FiCheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-green-600 mb-2">Congratulations!</h2>
                        <p className="text-lg text-gray-600">You passed the quiz</p>
                      </>
                    ) : (
                      <>
                        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-3xl">📚</span>
                        </div>
                        <h2 className="text-3xl font-bold text-orange-600 mb-2">Keep Learning!</h2>
                        <p className="text-lg text-gray-600">Review the material and try again</p>
                      </>
                    )}
                  </div>

                  <div className="mb-8">
                    <div className="text-5xl font-bold text-gray-900 mb-2">
                      {quizScore}%
                    </div>
                    <p className="text-gray-600">Your Score</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">
                        {Object.values(answers).filter((answer, index) => 
                          answer === questions[index].correct
                        ).length}
                      </div>
                      <p className="text-gray-600">Correct Answers</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">
                        {questions.length}
                      </div>
                      <p className="text-gray-600">Total Questions</p>
                    </div>
                  </div>

                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => router.push('/dashboard')}
                      className="btn-secondary"
                    >
                      Back to Dashboard
                    </button>
                    {quizScore !== null && quizScore < 70 && (
                      <button
                        onClick={handleStartQuiz}
                        className="btn-primary"
                      >
                        Retake Quiz
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}