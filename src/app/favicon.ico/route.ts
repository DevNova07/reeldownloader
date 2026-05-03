import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const iconPath = path.join(process.cwd(), 'public', 'icon.png');
  if (!fs.existsSync(iconPath)) {
    return new NextResponse('Icon not found', { status: 404 });
  }
  const iconBuffer = fs.readFileSync(iconPath);

  return new NextResponse(iconBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
