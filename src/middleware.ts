// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken');

  if (!token && request.nextUrl.pathname === '/Profile') {
    return NextResponse.redirect(new URL('/Login', request.url));
  }
}
