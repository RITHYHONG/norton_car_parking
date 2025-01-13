'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { applyActionCode } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Card, CardContent } from "@/components/ui/card"

export default function VerifyOTP() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState<string | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const router = useRouter()

  useEffect(() => {
    const email = sessionStorage.getItem('userEmail')
    if (!email) {
      router.replace('/login')
    }
  }, [router])

  const verifyOtpCode = async (otpCode: string) => {
    try {
      await applyActionCode(auth, otpCode)
      sessionStorage.removeItem('userEmail')
      router.push('/dashboard')
    } catch (error) {
      console.error('Verification error:', error)
      setError('Invalid or expired code. Please try again.')
    } finally {
      setIsVerifying(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsVerifying(true)
    setError(null)

    const otpCode = otp.join('')
    verifyOtpCode(otpCode)
  }

  const handleInputChange = (index: number, value: string) => {
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Move to next input if value is entered
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <h1 className="mb-4 text-2xl font-bold text-center">Verifying Login</h1>
          {isVerifying ? (
            <p className="text-center">Please wait while we verify your login...</p>
          ) : (
            <form onSubmit={handleSubmit} className="text-center">
              <div className="flex justify-center mb-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    ref={(el) => {
                      inputRefs.current[index] = el
                    }}
                    className="w-12 h-12 text-center border border-gray-300 rounded mx-1"
                  />
                ))}
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                className="mt-4 text-blue-500 hover:underline"
              >
                Verify OTP
              </button>
              <button
                onClick={() => router.push('/login')}
                className="block w-full mt-4 text-blue-500 hover:underline"
              >
                Return to Login
              </button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
