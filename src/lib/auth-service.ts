import { auth } from './firebase'
import { signInWithEmailAndPassword, signOut, User } from 'firebase/auth'
import { OTPService } from './otp-service'
import { sendVerificationEmail } from './email-service'
import { cookies } from 'next/headers'

export async function signInWithEmail(email: string, password: string): Promise<User> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    
    // Generate and send OTP
    const otp = OTPService.createOTP(email)
    await sendVerificationEmail(email, otp)
    
    return user
  } catch (error: any) {
    const errorMessage = getErrorMessage(error.code)
    throw new Error(errorMessage)
  }
}

function getErrorMessage(code: string): string {
  switch (code) {
    case 'auth/invalid-email':
      return 'Invalid email address'
    case 'auth/user-disabled':
      return 'This account has been disabled'
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Invalid email or password'
    case 'auth/too-many-requests':
      return 'Account temporarily disabled. Try again later or reset your password.'
    default:
      return 'An error occurred during sign in'
  }
}

export async function verifyOTP(code: string): Promise<boolean> {
  try {
    const isValid = OTPService.verifyOTP(code)
    if (isValid) {
      localStorage.setItem('isAuthenticated', 'true')
      document.cookie = 'isAuthenticated=true; path=/; max-age=86400'
    }
    return isValid
  } catch (error) {
    console.error('OTP verification error:', error)
    throw new Error('Failed to verify code')
  }
}

export async function logout(): Promise<void> {
  try {
    await signOut(auth)
    // Clear all auth states
    localStorage.clear()
    sessionStorage.clear()
    // Clear the authentication cookie
    document.cookie = 'isAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    // Force redirect to login
    window.location.href = '/login'
  } catch (error) {
    console.error('Logout error:', error)
    throw new Error('Failed to logout')
  }
}
