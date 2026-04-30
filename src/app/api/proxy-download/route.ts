import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fileUrl = searchParams.get("url");
  const type = searchParams.get("type") || "video";

  if (!fileUrl) {
    return new NextResponse("Missing URL", { status: 400 });
  }

  try {
    const mobileUserAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Mobile/15E148 Safari/604.1";
    const targetUrl = new URL(fileUrl);
    
    // Forward Range header from client to support video seeking/streaming
    const rangeHeader = request.headers.get("range");
    const fetchHeaders: Record<string, string> = {
      "User-Agent": mobileUserAgent,
      "Accept": "*/*",
      "Connection": "keep-alive",
    };

    // Smart Referer Selection
    if (targetUrl.hostname.includes("youtube") || targetUrl.hostname.includes("googlevideo") || targetUrl.hostname.includes("monity.io")) {
      fetchHeaders["Referer"] = "https://www.youtube.com/";
      fetchHeaders["Origin"] = "https://www.youtube.com";
    } else if (targetUrl.hostname.includes("tiktok") || targetUrl.hostname.includes("tiktokcdn")) {
      fetchHeaders["Referer"] = "https://www.tiktok.com/";
    } else if (targetUrl.hostname.includes("facebook") || targetUrl.hostname.includes("fbcdn")) {
      fetchHeaders["Referer"] = "https://www.facebook.com/";
    } else {
      fetchHeaders["Referer"] = `${targetUrl.protocol}//${targetUrl.hostname}/`;
    }

    if (rangeHeader) {
      fetchHeaders["Range"] = rangeHeader;
    }

    const response = await fetch(fileUrl, {
      headers: fetchHeaders,
      redirect: 'follow',
      cache: 'no-store'
    });

    if (!response.ok && response.status !== 206) {
      throw new Error(`Upstream Error ${response.status}`);
    }

    // Force essential headers for video streaming
    const resHeaders = new Headers();
    const headersToCopy = [
      "content-type",
      "content-length",
      "content-range",
      "accept-ranges",
      "cache-control",
      "content-disposition"
    ];
    
    headersToCopy.forEach(h => {
      const val = response.headers.get(h);
      if (val) resHeaders.set(h, val);
    });

    // Fallback content type
    if (!resHeaders.has("content-type")) {
      resHeaders.set("content-type", type === "audio" ? "audio/mpeg" : "video/mp4");
    }

    // Support for inline player
    const inline = searchParams.get("inline") === "true";
    if (inline) {
      resHeaders.set("Content-Disposition", "inline");
      resHeaders.set("Cache-Control", "public, max-age=3600");
    } else {
      const extension = type === "audio" ? "mp3" : "mp4";
      resHeaders.set("Content-Disposition", `attachment; filename="SavClip_${Date.now()}.${extension}"`);
    }

    // Optimization: If it's a small chunk or the upstream supports streaming
    return new NextResponse(response.body, {
      status: response.status,
      headers: resHeaders,
    });

  } catch (error) {
    console.error("Proxy Download Error:", error);
    return new NextResponse("Error downloading file", { status: 500 });
  }
}
