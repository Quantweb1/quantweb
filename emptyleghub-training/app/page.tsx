import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const session = await getServerSession(authOptions)
  
  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-primary">EmptyLegHub</span> Training
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Complete professional training modules, test your knowledge, and track your progress all in one place.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/login" className="btn-primary">
            Sign In
          </Link>
          <Link href="/register" className="btn-secondary">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  )
}