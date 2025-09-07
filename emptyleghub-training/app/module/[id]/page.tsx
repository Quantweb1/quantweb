import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ModuleViewer from '@/components/ModuleViewer'

interface ModulePageProps {
  params: {
    id: string
  }
}

export default async function ModulePage({ params }: ModulePageProps) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }

  const module = await prisma.trainingModule.findUnique({
    where: { id: params.id },
    include: {
      questions: {
        orderBy: { order: 'asc' }
      }
    }
  })

  if (!module) {
    redirect('/dashboard')
  }

  // Get or create progress
  let progress = await prisma.progress.findUnique({
    where: {
      userId_moduleId: {
        userId: session.user.id,
        moduleId: module.id
      }
    }
  })

  if (!progress) {
    progress = await prisma.progress.create({
      data: {
        userId: session.user.id,
        moduleId: module.id
      }
    })
  }

  return (
    <ModuleViewer 
      module={module}
      userId={session.user.id}
      initialProgress={progress}
    />
  )
}