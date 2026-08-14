import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const session = request.cookies.get('session');

  // Protect /secret-panel routes
  if (request.nextUrl.pathname.startsWith('/secret-panel')) {
    if (!session) {
      // Redirect to home if not logged in
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Protect /api/admin routes
  if (request.nextUrl.pathname.startsWith('/api/admin')) {
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/secret-panel/:path*', '/api/admin/:path*'],
};
