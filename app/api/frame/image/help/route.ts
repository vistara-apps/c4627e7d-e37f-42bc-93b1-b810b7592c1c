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
      <text x="600" y="120" font-family="Arial, sans-serif" font-size="32" font-weight="bold" text-anchor="middle" fill="#1e293b">
        ❓ How LinkGuard Works
      </text>

      <!-- Feature 1 -->
      <circle cx="150" cy="200" r="30" fill="#22c55e"/>
      <text x="150" y="210" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="white">1</text>
      <text x="220" y="190" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#1e293b">Paste Your Link</text>
      <text x="220" y="220" font-family="Arial, sans-serif" font-size="14" fill="#374151">Enter any suspicious URL you want to check</text>

      <!-- Feature 2 -->
      <circle cx="150" cy="280" r="30" fill="#22c55e"/>
      <text x="150" y="290" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="white">2</text>
      <text x="220" y="270" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#1e293b">AI Analysis</text>
      <text x="220" y="300" font-family="Arial, sans-serif" font-size="14" fill="#374151">Advanced AI scans for phishing and scam patterns</text>

      <!-- Feature 3 -->
      <circle cx="150" cy="360" r="30" fill="#22c55e"/>
      <text x="150" y="370" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="white">3</text>
      <text x="220" y="350" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#1e293b">Instant Results</text>
      <text x="220" y="380" font-family="Arial, sans-serif" font-size="14" fill="#374151">Get detailed analysis with confidence scores</text>

      <!-- Feature 4 -->
      <circle cx="150" cy="440" r="30" fill="#22c55e"/>
      <text x="150" y="450" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="white">4</text>
      <text x="220" y="430" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#1e293b">Report Threats</text>
      <text x="220" y="460" font-family="Arial, sans-serif" font-size="14" fill="#374151">Help protect others by reporting dangerous links</text>

      <!-- Buttons -->
      <rect x="350" y="520" width="200" height="50" rx="8" fill="#6b7280" stroke="#4b5563" stroke-width="2"/>
      <text x="450" y="550" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="white">
        ← Back
      </text>

      <rect x="650" y="520" width="200" height="50" rx="8" fill="#22c55e" stroke="#16a34a" stroke-width="2"/>
      <text x="750" y="550" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="white">
        Scan Link
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

