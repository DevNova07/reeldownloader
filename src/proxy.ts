import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, defaultLocale } from '@/i18n'

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const matchedLocale = locales.find(loc => acceptLanguage.includes(loc))
    if (matchedLocale) return matchedLocale
  }
  return defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  if (pathname.includes('.') || pathname === '/offline.html') return

  // 1. Redirect /en or /en/... requests to their clean (non-prefixed) paths
  if (pathname === '/en') {
    return NextResponse.redirect(new URL('/', request.url), 307);
  }
  if (pathname.startsWith('/en/')) {
    const cleanPath = pathname.substring(3); // Remove '/en'
    return NextResponse.redirect(new URL(cleanPath || '/', request.url), 307);
  }

  // 2. Rewrite clean paths to /en/... under the hood
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )
 
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    return NextResponse.rewrite(new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url))
  }
}
 
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
