'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { verifyOTP } from '@/lib/auth-service'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

export default function VerifyOTP() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [isVerifying, setIsVerifying] = useState(false)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes
  const [error, setError] = useState("")
  const [attempts, setAttempts] = useState(3)
  const router = useRouter()

  useEffect(() => {
    const email = sessionStorage.getItem('userEmail')
    if (!email) {
      router.replace('/dashboard')
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }, [])

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').trim()
    if (pastedData.length === 6 && /^\d+$/.test(pastedData)) {
      const digits = pastedData.split('')
      setOtp(digits)
    }
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsVerifying(true)
    setError("")

    try {
      const code = otp.join('')
      const isValid = await verifyOTP(code)
      
      if (isValid) {
        sessionStorage.removeItem('userEmail')
        toast.success('Verification successful!')
        
        // Small delay to ensure state is updated
        setTimeout(() => {
          router.push('/dashboard')
          router.refresh() // Force router refresh
        }, 1000)
      } else {
        setAttempts(prev => prev - 1)
        if (attempts <= 1) {
          toast.error('Too many failed attempts. Please try again later.')
          router.push('/login')
        } else {
          throw new Error(`Invalid code. ${attempts - 1} attempts remaining`)
        }
      }
    } catch (error: any) {
      setError(error.message)
      toast.error(error.message)
    } finally {
      setIsVerifying(false)
    }
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.querySelector(`input[name="otp-${index + 1}"]`) as HTMLInputElement
      if (nextInput) nextInput.focus()
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <h1 className="mb-4 text-2xl font-bold text-center">Enter Verification Code</h1>
          
          <div className="text-center mb-6 space-y-2">
            <p>We've sent a verification code to your email</p>
            <p className="text-sm text-muted-foreground">
              Code expires in {formatTime(timeLeft)}
            </p>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>

          <form onSubmit={handleVerify} onPaste={handlePaste}>
            <div className="flex justify-center gap-2 mb-6">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  pattern="\d"
                  maxLength={1}
                  name={`otp-${index}`}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-12 h-12 text-center text-lg"
                  required
                  disabled={isVerifying || timeLeft <= 0}
                />
              ))}
            </div>
            <Button 
              type="submit" 
              className="w-full"
              disabled={isVerifying || timeLeft <= 0}
            >
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify Code'
              )}
            </Button>
          </form>

          <div className="mt-4 space-y-2">
            <Button 
              variant="link" 
              className="w-full"
              onClick={() => router.push('/dashboard')}
            >
              Back to Login
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Didn't receive the code? Check your spam folder
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
