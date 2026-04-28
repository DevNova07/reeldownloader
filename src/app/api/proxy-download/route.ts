import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fileUrl = searchParams.get("url");
  const type = searchParams.get("type") || "video";

  if (!fileUrl) {
    return new NextResponse("Missing URL", { status: 400 });
  }

  try {
    const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
    const targetUrl = new URL(fileUrl);
    
    // Forward Range header from client to support video seeking/streaming
    const rangeHeader = request.headers.get("range");
    const fetchHeaders: Record<string, string> = {
      "User-Agent": userAgent,
      "Accept": "*/*",
      "Referer": targetUrl.hostname.includes("youtube") || targetUrl.hostname.includes("googlevideo")
        ? "https://www.youtube.com/" 
        : targetUrl.hostname.includes("tiktok") || targetUrl.hostname.includes("tiktokcdn")
        ? "https://www.tiktok.com/"
        : targetUrl.hostname.includes("facebook") || targetUrl.hostname.includes("fbcdn")
        ? "https://www.facebook.com/"
        : `${targetUrl.protocol}//${targetUrl.hostname}/`,
    };


    if (rangeHeader) {
      fetchHeaders["Range"] = rangeHeader;
    }

    // Add Origin to help with CORS-sensitive hosts
    if (targetUrl.hostname.includes("monity.io") || targetUrl.hostname.includes("googlevideo")) {
      fetchHeaders["Origin"] = "https://www.youtube.com";
    }

    const response = await fetch(fileUrl, {
      headers: fetchHeaders,
      redirect: 'follow'
    });

    if (!response.ok && response.status !== 206) {
      throw new Error(`Failed to fetch file: ${response.status}`);
    }

    const headers = new Headers();
    // Copy essential streaming and content headers
    const headersToCopy = [
      "content-type",
      "content-length",
      "content-range",
      "accept-ranges",
      "cache-control",
      "content-disposition",
      "connection"
    ];
    
    headersToCopy.forEach(h => {
      const val = response.headers.get(h);
      if (val) headers.set(h, val);
    });

    // Ensure we have a valid content-type if upstream missed it
    if (!headers.has("content-type")) {
      headers.set("content-type", type === "audio" ? "audio/mpeg" : type === "image" ? "image/jpeg" : "video/mp4");
    }

    const extension = type === "audio" ? "mp3" : type === "image" ? "jpg" : "mp4";
    const filename = `SavClip_${Date.now()}.${extension}`;

    const inline = searchParams.get("inline") === "true";
    if (inline) {
      // Don't override content-disposition if already set by upstream
      if (!headers.has("content-disposition")) {
        headers.set("Content-Disposition", `inline; filename="${filename}"`);
      }
      headers.set("Cache-Control", "public, max-age=3600");
    } else {
      headers.set("Content-Disposition", `attachment; filename="${filename}"`);
    }

    // Return the response as a stream
    return new NextResponse(response.body, {
      status: response.status,
      headers,
    });

  } catch (error) {
    console.error("Proxy Download Error:", error);
    return new NextResponse("Error downloading file", { status: 500 });
  }
}
