import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#98D8E8;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>
      <text x="600" y="200" font-family="Arial, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="#1e293b">
        🛡️ LinkGuard
      </text>
      <text x="600" y="260" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="#374151">
        Scan links for scams, instantly.
      </text>
      <text x="600" y="320" font-family="Arial, sans-serif" font-size="18" text-anchor="middle" fill="#6b7280">
        Real-time threat detection powered by AI
      </text>
      <rect x="450" y="380" width="300" height="60" rx="8" fill="#22c55e" stroke="#16a34a" stroke-width="2"/>
      <text x="600" y="420" font-family="Arial, sans-serif" font-size="20" font-weight="bold" text-anchor="middle" fill="white">
        Scan Link
      </text>
      <text x="600" y="520" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#6b7280">
        Click "Scan Link" to start scanning URLs for threats
      </text>
      <text x="600" y="550" font-family="Arial, sans-serif" font-size="14" text-anchor="middle" fill="#9ca3af">
        Free tier: 5 scans per day • Premium: $0.01/scan
      </text>
    </svg>
  `;

  return new NextResponse(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=300',
    },
  });
}

