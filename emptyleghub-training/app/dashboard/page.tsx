import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import DashboardClient from '@/components/DashboardClient'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }

  // Get user's progress
  const progress = await prisma.progress.findMany({
    where: { userId: session.user.id },
    include: { module: true }
  })

  // Get all modules
  const modules = await prisma.trainingModule.findMany({
    orderBy: { order: 'asc' }
  })

  // Calculate overall progress
  const completedModules = progress.filter(p => p.completed).length
  const totalModules = modules.length
  const overallProgress = totalModules > 0 ? (completedModules / totalModules) * 100 : 0

  return (
    <DashboardClient 
      user={session.user}
      modules={modules}
      progress={progress}
      overallProgress={overallProgress}
    />
  )
}