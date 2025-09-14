import { NextRequest, NextResponse } from 'next/server';
import { scanLink } from '../../../lib/api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { untrustedData } = body;

    if (!untrustedData) {
      return NextResponse.json({ error: 'Invalid frame data' }, { status: 400 });
    }

    const { buttonIndex, inputText } = untrustedData;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // Handle different button actions
    if (buttonIndex === 1) {
      // "Scan Link" button
      if (!inputText || !inputText.trim()) {
        // Show input form
        return new NextResponse(null, {
          status: 200,
          headers: {
            'fc:frame': 'vNext',
            'fc:frame:image': `${baseUrl}/api/frame/image/input`,
            'fc:frame:input:text': 'Paste link to scan...',
            'fc:frame:button:1': '🔍 Scan Now',
            'fc:frame:post_url': `${baseUrl}/api/frame/scan`,
          },
        });
      }
    } else if (buttonIndex === 2) {
      // "Help" button
      return new NextResponse(null, {
        status: 200,
        headers: {
          'fc:frame': 'vNext',
          'fc:frame:image': `${baseUrl}/api/frame/image/help`,
          'fc:frame:button:1': '← Back',
          'fc:frame:button:2': 'Scan Link',
          'fc:frame:post_url': `${baseUrl}/api/frame/actions`,
        },
      });
    }

    // Default: return to initial frame
    return new NextResponse(null, {
      status: 200,
      headers: {
        'fc:frame': 'vNext',
        'fc:frame:image': `${baseUrl}/api/frame/image`,
        'fc:frame:button:1': 'Scan Link',
        'fc:frame:button:2': 'Help',
        'fc:frame:post_url': `${baseUrl}/api/frame/actions`,
      },
    });

  } catch (error) {
    console.error('Frame action error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

