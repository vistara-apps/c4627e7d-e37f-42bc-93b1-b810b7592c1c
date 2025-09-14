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
      <text x="600" y="180" font-family="Arial, sans-serif" font-size="32" font-weight="bold" text-anchor="middle" fill="#1e293b">
        ⚠️ Report Failed
      </text>
      <text x="600" y="230" font-family="Arial, sans-serif" font-size="18" text-anchor="middle" fill="#374151">
        We couldn't process your report right now
      </text>

      <!-- Warning icon -->
      <circle cx="600" cy="320" r="60" fill="#f59e0b" stroke="#d97706" stroke-width="4"/>
      <text x="600" y="335" font-family="Arial, sans-serif" font-size="48" text-anchor="middle" fill="white">!</text>

      <text x="600" y="420" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#6b7280">
        Please try again later or contact support
      </text>
      <text x="600" y="450" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#6b7280">
        Your security is still our top priority
      </text>

      <!-- Buttons -->
      <rect x="400" y="500" width="200" height="60" rx="8" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>
      <text x="500" y="540" font-family="Arial, sans-serif" font-size="18" font-weight="bold" text-anchor="middle" fill="white">
        🔄 Try Again
      </text>

      <rect x="650" y="500" width="200" height="60" rx="8" fill="#6b7280" stroke="#4b5563" stroke-width="2"/>
      <text x="750" y="540" font-family="Arial, sans-serif" font-size="18" font-weight="bold" text-anchor="middle" fill="white">
        🏠 Home
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

