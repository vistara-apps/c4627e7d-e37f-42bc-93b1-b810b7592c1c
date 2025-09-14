import { NextRequest, NextResponse } from 'next/server';
import { reportScamLink } from '../../../lib/api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { untrustedData } = body;

    if (!untrustedData) {
      return NextResponse.json({ error: 'Invalid frame data' }, { status: 400 });
    }

    const { buttonIndex } = untrustedData;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // Extract URL from state or previous frame data
    // For now, we'll use a placeholder - in production, you'd store this in frame state
    const url = 'reported-url'; // This should come from frame state

    if (buttonIndex === 2 || buttonIndex === 3) { // Report buttons
      // Report the scam link
      const reportResult = await reportScamLink(url);

      if (reportResult.success) {
        return new NextResponse(null, {
          status: 200,
          headers: {
            'fc:frame': 'vNext',
            'fc:frame:image': `${baseUrl}/api/frame/image/reported`,
            'fc:frame:button:1': '✅ Thanks!',
            'fc:frame:button:2': '🔄 Scan Another',
            'fc:frame:post_url': `${baseUrl}/api/frame/actions`,
          },
        });
      } else {
        return new NextResponse(null, {
          status: 200,
          headers: {
            'fc:frame': 'vNext',
            'fc:frame:image': `${baseUrl}/api/frame/image/report-error`,
            'fc:frame:button:1': '🔄 Try Again',
            'fc:frame:button:2': '🏠 Home',
            'fc:frame:post_url': `${baseUrl}/api/frame/actions`,
          },
        });
      }
    }

    // Default: return to home
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
    console.error('Report error:', error);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    return new NextResponse(null, {
      status: 200,
      headers: {
        'fc:frame': 'vNext',
        'fc:frame:image': `${baseUrl}/api/frame/image/report-error`,
        'fc:frame:button:1': '🏠 Home',
        'fc:frame:post_url': `${baseUrl}/api/frame/actions`,
      },
    });
  }
}

