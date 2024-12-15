'use server'

import { authenticate } from "@/utils/auth"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function loginUser(prevState: any, formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  if (authenticate(username, password)) {
    // In a real application, you'd want to set a secure, HTTP-only cookie
    // and possibly store a session in a database
    cookies().set('user', username, { httpOnly: true, secure: true })
    redirect('/dashboard')
  }

  return { error: 'Invalid username or password' }
}

