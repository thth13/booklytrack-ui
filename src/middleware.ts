import { NextResponse } from 'next/server';

export function middleware(req: Request) {
  const token = req.headers.get('Authorization');
  if (!token && new URL(req.url).pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}
