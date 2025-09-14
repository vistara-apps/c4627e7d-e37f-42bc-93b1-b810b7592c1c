import { NextRequest, NextResponse } from 'next/server';
import { scanLink } from '../../../lib/api';
import { canUserScan, recordScan, getUserStats } from '../../../lib/user';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { untrustedData } = body;

    if (!untrustedData?.inputText) {
      return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
    }

    const url = untrustedData.inputText.trim();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // Get user ID from frame data (fid as user identifier)
    const userId = untrustedData.fid?.toString() || 'anonymous';

    // Check if user can scan
    const scanCheck = canUserScan(userId);
    if (!scanCheck.canScan) {
      return new NextResponse(null, {
        status: 200,
        headers: {
          'fc:frame': 'vNext',
          'fc:frame:image': `${baseUrl}/api/frame/image/result?url=${encodeURIComponent(url)}&status=limit&message=${encodeURIComponent(scanCheck.reason || 'Scan limit reached')}`,
          'fc:frame:button:1': '💎 Upgrade Premium',
          'fc:frame:button:2': '🏠 Home',
          'fc:frame:post_url': `${baseUrl}/api/frame/actions`,
        },
      });
    }

    // Scan the link
    const scanResult = await scanLink(url);

    // Record the scan if successful
    if (scanResult.success) {
      recordScan(userId);
    }

    if (!scanResult.success) {
      // Show error result
      return new NextResponse(null, {
        status: 200,
        headers: {
          'fc:frame': 'vNext',
          'fc:frame:image': `${baseUrl}/api/frame/image/result?url=${encodeURIComponent(url)}&status=error&message=${encodeURIComponent(scanResult.error || 'Scan failed')}`,
          'fc:frame:button:1': '🔄 Try Again',
          'fc:frame:button:2': '🏠 Home',
          'fc:frame:post_url': `${baseUrl}/api/frame/actions`,
        },
      });
    }

    const result = scanResult.data;
    const status = result.status;
    const confidence = Math.round(result.confidence * 100);

    // Create result frame
    let buttons = '';
    let postUrl = `${baseUrl}/api/frame/actions`;

    if (status === 'safe') {
      buttons = `fc:frame:button:1: ✅ Safe Link&fc:frame:button:2: 🔄 Scan Another&fc:frame:button:3: 🏠 Home`;
    } else if (status === 'warning') {
      buttons = `fc:frame:button:1: ⚠️ Proceed with Caution&fc:frame:button:2: 🚨 Report Scam&fc:frame:button:3: 🔄 Scan Another&fc:frame:button:4: 🏠 Home`;
      postUrl = `${baseUrl}/api/frame/report`;
    } else {
      buttons = `fc:frame:button:1: 🚨 Dangerous Link&fc:frame:button:2: 🚨 Report Scam&fc:frame:button:3: 🔄 Scan Another&fc:frame:button:4: 🏠 Home`;
      postUrl = `${baseUrl}/api/frame/report`;
    }

    const headers: Record<string, string> = {
      'fc:frame': 'vNext',
      'fc:frame:image': `${baseUrl}/api/frame/image/result?url=${encodeURIComponent(url)}&status=${status}&confidence=${confidence}&threats=${encodeURIComponent(JSON.stringify(result.threats))}&explanation=${encodeURIComponent(result.explanation)}`,
      'fc:frame:post_url': postUrl,
    };

    // Add buttons
    const buttonArray = buttons.split('&');
    buttonArray.forEach(button => {
      const [key, value] = button.split(':');
      headers[key] = value;
    });

    return new NextResponse(null, {
      status: 200,
      headers,
    });

  } catch (error) {
    console.error('Scan error:', error);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    return new NextResponse(null, {
      status: 200,
      headers: {
        'fc:frame': 'vNext',
        'fc:frame:image': `${baseUrl}/api/frame/image/result?status=error&message=Scan%20failed`,
        'fc:frame:button:1': '🔄 Try Again',
        'fc:frame:button:2': '🏠 Home',
        'fc:frame:post_url': `${baseUrl}/api/frame/actions`,
      },
    });
  }
}
