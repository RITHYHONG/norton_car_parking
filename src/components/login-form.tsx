'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LucideLoader2 } from 'lucide-react'
import Norton from "../../public/Norton Logo.png"
import Image from 'next/image'
export function LoginForm({ loginAction }: { loginAction: (prevState: any, formData: FormData) => Promise<{ error: string } | undefined> }) {
  const [state, formAction] = useFormState(loginAction, null)
  const { pending } = useFormStatus()

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="flex flex-col items-center text-center">
        <Image
          src={Norton}
          alt="Logo"
          width={50}
          height={50}
          className="mb-4"
        />
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-balance text-muted-foreground">
          Login to your Acme Inc account
        </p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          type="text"
          placeholder="admin"
          required
        />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
          <a
            href="#"
            className="ml-auto text-sm underline-offset-2 hover:underline"
          >
            Forgot your password?
          </a>
        </div>
        <Input id="password" name="password" type="password" required />
      </div>
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? (
          <>
            <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
            Logging in...
          </>
        ) : (
          'Login'
        )}
      </Button>
      {state?.error && (
        <div className="text-center text-sm text-red-500">
          {state.error}
        </div>
      )}
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  )
}

