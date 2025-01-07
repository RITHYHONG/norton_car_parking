import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ success: true }, { status: 200, headers: { 'Set-Cookie': `session=; Max-Age=0; HttpOnly; Secure; Path=/` } });
}

