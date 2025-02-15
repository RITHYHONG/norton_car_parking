'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { usePathname, useRouter } from 'next/navigation'

interface AuthContextType {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true })

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname() ?? '/login' // Provide default value

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Check both localStorage and cookie for authentication
        const isAuthenticated = 
          localStorage.getItem('isAuthenticated') === 'true' || 
          document.cookie.includes('isAuthenticated=true')

        if (!isAuthenticated && !pathname.includes('/verify-otp')) {
          router.push('/login')
          return
        }
      }
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router, pathname])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

