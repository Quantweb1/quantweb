import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { moduleId, answers } = body

    // Get module with questions
    const module = await prisma.trainingModule.findUnique({
      where: { id: moduleId },
      include: { questions: true }
    })

    if (!module) {
      return NextResponse.json(
        { error: 'Module not found' },
        { status: 404 }
      )
    }

    // Calculate score
    let correctAnswers = 0
    const answerRecords = []

    for (const question of module.questions) {
      const userAnswer = answers[question.id]
      const isCorrect = userAnswer === question.correct
      
      if (isCorrect) {
        correctAnswers++
      }

      answerRecords.push({
        questionId: question.id,
        selected: userAnswer,
        correct: isCorrect
      })
    }

    const score = (correctAnswers / module.questions.length) * 100
    const passed = score >= 70 // 70% passing grade

    // Create quiz attempt
    const attempt = await prisma.quizAttempt.create({
      data: {
        userId: session.user.id,
        moduleId: moduleId,
        score: score,
        passed: passed,
        completedAt: new Date(),
        answers: {
          create: answerRecords
        }
      }
    })

    // Update progress
    await prisma.progress.update({
      where: {
        userId_moduleId: {
          userId: session.user.id,
          moduleId: moduleId
        }
      },
      data: {
        completed: passed,
        score: score,
        completedAt: passed ? new Date() : null
      }
    })

    return NextResponse.json({
      attemptId: attempt.id,
      score: score,
      passed: passed,
      correctAnswers: correctAnswers,
      totalQuestions: module.questions.length
    })
  } catch (error) {
    console.error('Quiz submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}