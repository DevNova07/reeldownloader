import { NextRequest, NextResponse } from "next/server";

/**
 * Global Share Target Redirector.
 * Catches /share-target calls and redirects to the clean root URL with params.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text') || "";
  const url = searchParams.get('url') || "";
  const title = searchParams.get('title') || "";

  // Redirect to the clean root page with all params preserved
  const targetUrl = new URL(`/`, request.url);
  if (text) targetUrl.searchParams.set('text', text);
  if (url) targetUrl.searchParams.set('url', url);
  if (title) targetUrl.searchParams.set('title', title);

  return NextResponse.redirect(targetUrl);
}
