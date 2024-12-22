'use client'

import { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useFormStatus } from 'react-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LucideLoader2 } from 'lucide-react'
import Norton from "../../public/Norton Logo.png"
import Image from 'next/image'

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [error, setError] = useState<string | null>(null);
  // const { pending } = useFormStatus()
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
  
    const formData = new FormData(event.currentTarget);
    const email = formData.get('username') as string;
    const password = formData.get('password') as string;
  
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess();
    } catch (error) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
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
        <Input id="username" name="username" type="email" placeholder="email@example.com" required />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
          <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
            Forgot your password?
          </a>
        </div>
        <Input id="password" name="password" type="password" required />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
  {loading ? (
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

