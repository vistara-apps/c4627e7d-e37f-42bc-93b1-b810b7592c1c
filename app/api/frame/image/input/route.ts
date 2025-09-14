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
      <text x="600" y="150" font-family="Arial, sans-serif" font-size="36" font-weight="bold" text-anchor="middle" fill="#1e293b">
        🔍 Link Scanner
      </text>
      <text x="600" y="200" font-family="Arial, sans-serif" font-size="18" text-anchor="middle" fill="#374151">
        Paste a link below to scan for threats
      </text>

      <!-- Input box simulation -->
      <rect x="300" y="250" width="600" height="60" rx="8" fill="white" stroke="#d1d5db" stroke-width="2"/>
      <text x="310" y="290" font-family="Arial, sans-serif" font-size="16" fill="#9ca3af">
        Paste link to scan...
      </text>

      <!-- Scan button -->
      <rect x="450" y="350" width="300" height="60" rx="8" fill="#22c55e" stroke="#16a34a" stroke-width="2"/>
      <text x="600" y="390" font-family="Arial, sans-serif" font-size="20" font-weight="bold" text-anchor="middle" fill="white">
        🔍 Scan Now
      </text>

      <text x="600" y="480" font-family="Arial, sans-serif" font-size="14" text-anchor="middle" fill="#6b7280">
        Our AI will analyze the link for phishing, malware, and scam patterns
      </text>
      <text x="600" y="510" font-family="Arial, sans-serif" font-size="14" text-anchor="middle" fill="#6b7280">
        Results appear instantly with detailed threat analysis
      </text>
    </svg>
  `;

  return new NextResponse(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=60',
    },
  });
}

