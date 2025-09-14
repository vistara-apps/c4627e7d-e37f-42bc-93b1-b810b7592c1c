import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  // Initial frame metadata for LinkGuard
  const frameMetadata = {
    'fc:frame': 'vNext',
    'fc:frame:image': `${baseUrl}/api/frame/image`,
    'fc:frame:button:1': '🔍 Scan Link',
    'fc:frame:button:2': '❓ Help',
    'fc:frame:post_url': `${baseUrl}/api/frame/actions`,
  };

  return new NextResponse(null, {
    status: 200,
    headers: {
      ...frameMetadata,
      'Content-Type': 'text/html',
    },
  });
}

export async function POST() {
  // Handle any POST requests to the frame route
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
