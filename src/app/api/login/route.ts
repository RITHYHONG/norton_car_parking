import { NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebaseAdmin'

export async function POST(request: Request) {
  const { idToken } = await request.json()

  try {
    const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn })
    const options = {
      name: 'session',
      value: sessionCookie,
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
    }

    return NextResponse.json({ success: true }, { status: 200, headers: { 'Set-Cookie': `session=${sessionCookie}; Max-Age=${options.maxAge}; HttpOnly; Secure; Path=/` } })
  } catch (error) {
    return NextResponse.json({ error: 'UNAUTHORIZED REQUEST' }, { status: 401 })
  }
}

