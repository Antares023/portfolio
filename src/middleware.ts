import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const secretPath = process.env.ADMIN_SECRET_PATH;
  const path = req.nextUrl.pathname;

  // 1. If someone tries to access the real admin panel using the secret path
  if (secretPath && path.startsWith(secretPath)) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    
    // If not authenticated, redirect to NextAuth signin
    if (!token) {
      // Rewrite the URL so NextAuth callback redirects back to secret path
      const url = req.nextUrl.clone();
      url.pathname = '/api/auth/signin';
      url.searchParams.set('callbackUrl', req.url);
      return NextResponse.redirect(url);
    }
    
    // If authenticated but trying to access the exact secret path (root of admin)
    // we should render the admin dashboard. We can rewrite it to a hidden folder,
    // or just let it pass if we actually use the secret path as the folder name.
    // Wait, Next.js routing is filesystem based. We cannot name our folder with an env variable.
    // So we rewrite the secret path to a hidden internal path, like `/admin-internal`.
    const url = req.nextUrl.clone();
    // Replace the secret path with the internal admin route
    url.pathname = path.replace(secretPath, '/admin-internal');
    return NextResponse.rewrite(url);
  }

  // 2. Block direct access to the internal admin path from the outside
  if (path.startsWith('/admin-internal')) {
    // Return 404 or redirect to home to hide its existence
    const url = req.nextUrl.clone();
    url.pathname = '/404'; // Or any other not found page
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// Config to limit middleware to specific paths to optimize performance
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
