'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent } from "@/components/ui/card"
import { LoginForm } from "@/components/login-form"
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'
import { useEffect } from 'react'
import { ErrorBoundary } from '@/components/ErrorBoundary'

export default function LoginPage() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  return (
    <ErrorBoundary>
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <Card className="overflow-hidden">
            <CardContent className="grid p-0 md:grid-cols-2">
              <div className="bg-muted dark:bg-gray-800 flex justify-center items-center">
                <Image 
                  src="/bg-login.png" 
                  alt="Login background" 
                  width={500}
                  height={500}
                  priority
                  className="hidden sm:block"
                />
              </div>
              <div className="p-6 md:p-8">
                <LoginForm />
              </div>
            </CardContent>
          </Card>
          <div className="mt-4 text-balance text-center text-xs text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <a href="#" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </a>
            .
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}

