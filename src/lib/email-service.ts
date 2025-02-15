import { auth } from './firebase';

export async function sendVerificationEmail(email: string, otp: string) {
  try {
    const response = await fetch('/api/send-verification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.details || data.error || 'Failed to send verification email')
    }

    return true
  } catch (error: any) {
    console.error('Send verification error:', error)
    throw new Error(
      'Failed to send verification code. Please check your email settings and try again.'
    )
  }
}
