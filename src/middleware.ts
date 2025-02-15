import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const publicPaths = ['/login', '/verify-otp']
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname)
  
  // Check both cookie and URL parameters for authentication
  const isAuthenticated = request.cookies.get('isAuthenticated')?.value === 'true'
  const hasAuthParam = request.nextUrl.searchParams.get('auth') === 'true'

  if (isPublicPath && (isAuthenticated || hasAuthParam)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (!isPublicPath && !isAuthenticated && !hasAuthParam) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/verify-otp', '/dashboard/:path*']
}
