'use client'

import { useState } from 'react'
import { signInWithEmailAndPassword, sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useFormStatus } from 'react-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, LucideLoader2 } from 'lucide-react'
import Norton from "../../public/Norton Logo.png"
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authMethod, setAuthMethod] = useState<'password' | 'link'>('password');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
      if (authMethod === 'password') {
        // Try password authentication first
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Login successful:', userCredential.user);
        router.push('/dashboard');
      } else {
        // Fall back to email link if password auth fails or user chooses it
        const actionCodeSettings = {
          url: `${window.location.origin}/verify-otp`,
          handleCodeInApp: true
        };
        
        await sendSignInLinkToEmail(auth, email, actionCodeSettings);
        window.localStorage.setItem('emailForSignIn', email);
        alert('Check your email for the login link');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.code === 'auth/operation-not-allowed') {
        setError('This login method is not enabled. Please use password login.');
        setAuthMethod('password');
      } else if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        setError('Invalid email or password');
      } else {
        setError(error.message || 'An error occurred during login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col items-center text-center">
        <Image src={Norton} alt="Logo" width={50} height={50} className="mb-4" />
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-balance text-muted-foreground">
          Login to Automatic Car Parking System
        </p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="username">Email</Label>
        <Input 
          id="username" 
          name="username" 
          type="email" 
          required 
        />
      </div>

      {authMethod === 'password' && (
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <button 
              type="button" 
              onClick={() => setAuthMethod('link')}
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
          <Input 
            id="password" 
            name="password" 
            type={showPassword ? "text" : "password"} 
            required 
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-500" />
            ) : (
              <Eye className="h-4 w-4 text-gray-500" />
            )}
          </button>
        </div>
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
            {authMethod === 'password' ? 'Logging in...' : 'Sending link...'}
          </>
        ) : (
          authMethod === 'password' ? 'Login' : 'Submit'
        )}
      </Button>

      {error && (
        <div className="text-center text-sm text-red-500">
          {error}
        </div>
      )}
    </form>
  )
}
