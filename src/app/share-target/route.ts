import { NextRequest, NextResponse } from "next/server";
import { defaultLocale } from "@/i18n";

/**
 * Global Share Target Redirector.
 * Catches /share-target calls and redirects to the localized /share-target route.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text') || "";
  const url = searchParams.get('url') || "";
  const title = searchParams.get('title') || "";

  // Simply redirect to the default locale's share target with all params preserved
  const targetUrl = new URL(`/${defaultLocale}/share-target`, request.url);
  if (text) targetUrl.searchParams.set('text', text);
  if (url) targetUrl.searchParams.set('url', url);
  if (title) targetUrl.searchParams.set('title', title);

  return NextResponse.redirect(targetUrl);
}
