'use client'

import { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useFormStatus } from 'react-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LucideLoader2 } from 'lucide-react'
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
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
      // First verify email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Generate and send OTP
      const actionCodeSettings = {
        url: `${window.location.origin}/verify-otp`,
        handleCodeInApp: true,
      };
      
      await sendEmailVerification(userCredential.user, actionCodeSettings);
      
      // Store user email for OTP verification
      sessionStorage.setItem('userEmail', email);
      
      router.push('/verify-otp');
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        setError('Invalid email or password');
      } else {
        setError('An error occurred during login. Please try again.');
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
          Login to your Acme Inc account
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

      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
        </div>
        <div className="relative">
          <Input 
            id="password" 
            name="password" 
            type={showPassword ? "text" : "password"}
            required
          />
          {/* ...existing password visibility toggle... */}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
            Logging in...
          </>
        ) : (
          'Login'
        )}
      </Button>

      {error && (
        <div className="text-center text-sm text-red-500">
          {error}
        </div>
      )}

      <div className="text-center text-sm">
        Don't have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  )
}

