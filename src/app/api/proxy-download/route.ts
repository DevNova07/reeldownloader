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
    const response = await fetch(fileUrl, {
      headers: {
        "User-Agent": userAgent,
        "Accept": "*/*",
        "Referer": `${targetUrl.protocol}//${targetUrl.hostname}/`,
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.status}`);
    }

    const headers = new Headers(response.headers);
    const extension = type === "audio" ? "mp3" : type === "image" ? "jpg" : "mp4";
    const filename = `InstaSnap_${Date.now()}.${extension}`;

    const inline = searchParams.get("inline") === "true";
    if (inline) {
      headers.set("Content-Disposition", `inline; filename="${filename}"`);
    } else {
      headers.set("Content-Disposition", `attachment; filename="${filename}"`);
    }

    return new NextResponse(response.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Proxy Download Error:", error);
    return new NextResponse("Error downloading file", { status: 500 });
  }
}
