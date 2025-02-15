'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { completeEmailVerification } from '@/lib/auth-service'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function VerifyEmailPage() {
  const [isVerifying, setIsVerifying] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const oobCode = searchParams.get('oobCode')

  useEffect(() => {
    async function verifyEmail() {
      if (!oobCode) {
        toast.error('Invalid verification link')
        router.push('/login')
        return
      }

      try {
        await completeEmailVerification(oobCode)
        toast.success('Email verified successfully!')
        router.push('/dashboard')
      } catch (error) {
        console.error('Verification error:', error)
        toast.error('Verification failed. Please try again.')
        router.push('/login')
      } finally {
        setIsVerifying(false)
      }
    }

    verifyEmail()
  }, [oobCode, router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <h1 className="mb-4 text-2xl font-bold text-center">Email Verification</h1>
          <p className="text-center mb-4">
            {isVerifying ? 'Verifying your email...' : 'Verification complete!'}
          </p>
          <Button 
            variant="link" 
            className="w-full"
            onClick={() => router.push('/login')}
          >
            Back to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
