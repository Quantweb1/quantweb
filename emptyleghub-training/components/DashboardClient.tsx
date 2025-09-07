'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiBook, FiCheckCircle, FiClock, FiLogOut, FiUser } from 'react-icons/fi'

interface Module {
  id: string
  title: string
  description: string
  duration: number
  order: number
}

interface Progress {
  moduleId: string
  completed: boolean
  score?: number
}

interface DashboardClientProps {
  user: any
  modules: Module[]
  progress: Progress[]
  overallProgress: number
}

export default function DashboardClient({ user, modules, progress, overallProgress }: DashboardClientProps) {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null)

  const getModuleProgress = (moduleId: string) => {
    return progress.find(p => p.moduleId === moduleId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">EmptyLegHub Training</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-700">
                <FiUser className="w-5 h-5" />
                <span>{user.name}</span>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FiLogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h2>
          <p className="text-gray-600">Continue your training journey</p>
        </div>

        {/* Progress Overview */}
        <div className="card mb-8">
          <h3 className="text-xl font-semibold mb-4">Your Progress</h3>
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Overall Completion</span>
              <span>{Math.round(overallProgress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-primary h-3 rounded-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{modules.length}</div>
              <div className="text-gray-600">Total Modules</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {progress.filter(p => p.completed).length}
              </div>
              <div className="text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">
                {modules.length - progress.filter(p => p.completed).length}
              </div>
              <div className="text-gray-600">Remaining</div>
            </div>
          </div>
        </div>

        {/* Training Modules */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Training Modules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => {
              const moduleProgress = getModuleProgress(module.id)
              const isCompleted = moduleProgress?.completed || false
              const score = moduleProgress?.score

              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onHoverStart={() => setHoveredModule(module.id)}
                  onHoverEnd={() => setHoveredModule(null)}
                >
                  <Link href={`/module/${module.id}`}>
                    <div className={`card h-full cursor-pointer transition-all duration-200 ${
                      hoveredModule === module.id ? 'shadow-lg transform -translate-y-1' : ''
                    }`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <FiBook className="w-6 h-6 text-primary" />
                        </div>
                        {isCompleted && (
                          <FiCheckCircle className="w-6 h-6 text-green-600" />
                        )}
                      </div>
                      
                      <h4 className="text-lg font-semibold mb-2">{module.title}</h4>
                      <p className="text-gray-600 text-sm mb-4">{module.description}</p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-gray-500">
                          <FiClock className="w-4 h-4" />
                          <span>{module.duration} min</span>
                        </div>
                        {score !== undefined && score !== null && (
                          <div className="text-green-600 font-semibold">
                            Score: {Math.round(score)}%
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4">
                        <button className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                          isCompleted 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-primary text-white hover:bg-blue-600'
                        }`}>
                          {isCompleted ? 'Review Module' : 'Start Module'}
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}