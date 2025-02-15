import { auth } from './firebase'
import { 
  applyActionCode,
  signInWithEmailAndPassword,
  User 
} from 'firebase/auth'
import { OTPService } from './otp-service'
import { sendVerificationEmail } from './email-service'

export class AuthError extends Error {
  code: string
  constructor(message: string, code: string) {
    super(message)
    this.code = code
  }
}

export async function signInWithEmail(email: string, password: string): Promise<User> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Generate and send OTP after successful login
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

export async function completeEmailVerification(oobCode: string): Promise<void> {
  try {
    await applyActionCode(auth, oobCode)
  } catch (error: any) {
    throw new Error('Failed to verify email')
  }
}

export async function verifyOTP(code: string): Promise<boolean> {
  try {
    return OTPService.verifyOTP(code)
  } catch (error) {
    console.error('OTP verification error:', error)
    throw new Error('Failed to verify code')
  }
}
