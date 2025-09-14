import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url') || '';
  const status = searchParams.get('status') || 'safe';
  const confidence = searchParams.get('confidence') || '90';
  const threats = searchParams.get('threats') || '[]';
  const explanation = searchParams.get('explanation') || '';
  const message = searchParams.get('message') || '';

  let bgColor = '#22c55e'; // green for safe
  let statusText = 'SAFE';
  let statusIcon = '✅';
  let title = 'Link is Safe';

  if (status === 'warning') {
    bgColor = '#f59e0b'; // yellow
    statusText = 'WARNING';
    statusIcon = '⚠️';
    title = 'Proceed with Caution';
  } else if (status === 'danger') {
    bgColor = '#ef4444'; // red
    statusText = 'DANGER';
    statusIcon = '🚨';
    title = 'Dangerous Link Detected';
  } else if (status === 'error') {
    bgColor = '#6b7280'; // gray
    statusText = 'ERROR';
    statusIcon = '❌';
    title = message || 'Scan Failed';
  } else if (status === 'limit') {
    bgColor = '#8b5cf6'; // purple
    statusText = 'LIMIT';
    statusIcon = '⏰';
    title = message || 'Scan Limit Reached';
  }

  const truncatedUrl = url.length > 50 ? url.substring(0, 47) + '...' : url;

  let threatsText = '';
  if (status !== 'error' && threats !== '[]') {
    try {
      const threatsArray = JSON.parse(threats);
      if (threatsArray.length > 0) {
        threatsText = threatsArray.slice(0, 2).join(', ');
        if (threatsArray.length > 2) threatsText += '...';
      }
    } catch (e) {
      // Ignore parse errors
    }
  }

  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#98D8E8;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>

      <!-- Status Badge -->
      <rect x="50" y="50" width="150" height="50" rx="25" fill="${bgColor}"/>
      <text x="125" y="80" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="white">
        ${statusIcon} ${statusText}
      </text>

      <!-- Title -->
      <text x="600" y="120" font-family="Arial, sans-serif" font-size="32" font-weight="bold" text-anchor="middle" fill="#1e293b">
        ${title}
      </text>

      ${url ? `
      <!-- URL -->
      <rect x="100" y="160" width="1000" height="50" rx="8" fill="white" stroke="#d1d5db" stroke-width="1"/>
      <text x="110" y="190" font-family="Arial, sans-serif" font-size="14" fill="#374151">
        ${truncatedUrl}
      </text>
      ` : ''}

      ${status !== 'error' ? `
      <!-- Confidence -->
      <text x="600" y="250" font-family="Arial, sans-serif" font-size="18" text-anchor="middle" fill="#374151">
        Confidence: ${confidence}%
      </text>
      ` : ''}

      ${threatsText ? `
      <!-- Threats -->
      <text x="600" y="290" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#dc2626">
        Threats: ${threatsText}
      </text>
      ` : ''}

      ${explanation ? `
      <!-- Explanation -->
      <text x="600" y="330" font-family="Arial, sans-serif" font-size="14" text-anchor="middle" fill="#6b7280">
        ${explanation.length > 100 ? explanation.substring(0, 97) + '...' : explanation}
      </text>
      ` : ''}

      <!-- Action buttons area -->
      <rect x="200" y="400" width="800" height="180" rx="12" fill="white" stroke="#e5e7eb" stroke-width="1" opacity="0.8"/>
      <text x="600" y="430" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#374151">
        Choose an action below
      </text>

      ${status === 'safe' ? `
      <rect x="250" y="460" width="300" height="50" rx="8" fill="#22c55e"/>
      <text x="400" y="490" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="white">
        ✅ Safe Link
      </text>
      <rect x="650" y="460" width="300" height="50" rx="8" fill="#6b7280"/>
      <text x="800" y="490" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="white">
        🔄 Scan Another
      </text>
      ` : status === 'warning' ? `
      <rect x="200" y="460" width="180" height="50" rx="8" fill="#f59e0b"/>
      <text x="290" y="490" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="white">
        ⚠️ Caution
      </text>
      <rect x="410" y="460" width="180" height="50" rx="8" fill="#dc2626"/>
      <text x="500" y="490" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="white">
        🚨 Report
      </text>
      <rect x="620" y="460" width="180" height="50" rx="8" fill="#6b7280"/>
      <text x="710" y="490" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="white">
        🔄 Scan Another
      </text>
      <rect x="830" y="460" width="180" height="50" rx="8" fill="#374151"/>
      <text x="920" y="490" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="white">
        🏠 Home
      </text>
      ` : status === 'danger' ? `
      <rect x="200" y="460" width="180" height="50" rx="8" fill="#dc2626"/>
      <text x="290" y="490" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="white">
        🚨 Dangerous
      </text>
      <rect x="410" y="460" width="180" height="50" rx="8" fill="#dc2626"/>
      <text x="500" y="490" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="white">
        🚨 Report
      </text>
      <rect x="620" y="460" width="180" height="50" rx="8" fill="#6b7280"/>
      <text x="710" y="490" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="white">
        🔄 Scan Another
      </text>
      <rect x="830" y="460" width="180" height="50" rx="8" fill="#374151"/>
      <text x="920" y="490" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="white">
        🏠 Home
      </text>
      ` : status === 'limit' ? `
      <rect x="350" y="460" width="250" height="50" rx="8" fill="#8b5cf6"/>
      <text x="475" y="490" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="white">
        💎 Upgrade Premium
      </text>
      <rect x="650" y="460" width="250" height="50" rx="8" fill="#374151"/>
      <text x="775" y="490" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="white">
        🏠 Home
      </text>
      ` : `
      <rect x="350" y="460" width="250" height="50" rx="8" fill="#6b7280"/>
      <text x="475" y="490" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="white">
        🔄 Try Again
      </text>
      <rect x="650" y="460" width="250" height="50" rx="8" fill="#374151"/>
      <text x="775" y="490" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="white">
        🏠 Home
      </text>
      `}
    </svg>
  `;

  return new NextResponse(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=30',
    },
  });
}
