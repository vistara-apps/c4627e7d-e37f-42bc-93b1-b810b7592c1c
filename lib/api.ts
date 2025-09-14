import { ScanResult, ApiResponse } from './types';
import { KNOWN_SAFE_DOMAINS, SUSPICIOUS_PATTERNS, THREAT_TYPES } from './constants';
import { extractDomain } from './utils';

// Mock phishing database check
async function checkPhishingDatabase(url: string): Promise<{ isMalicious: boolean; threatType?: string }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const domain = extractDomain(url);
  
  // Check against known safe domains
  if (KNOWN_SAFE_DOMAINS.some(safeDomain => domain.includes(safeDomain))) {
    return { isMalicious: false };
  }
  
  // Check for suspicious patterns
  const suspiciousPattern = SUSPICIOUS_PATTERNS.find(pattern => pattern.test(url));
  if (suspiciousPattern) {
    return { 
      isMalicious: true, 
      threatType: THREAT_TYPES.SUSPICIOUS 
    };
  }
  
  // Mock some random results for demo
  const mockMaliciousUrls = [
    'phishing-site.com',
    'fake-metamask.net',
    'scam-crypto.org',
    'malicious-link.co',
  ];
  
  if (mockMaliciousUrls.some(malicious => domain.includes(malicious))) {
    return { 
      isMalicious: true, 
      threatType: THREAT_TYPES.PHISHING 
    };
  }
  
  return { isMalicious: false };
}

// Mock AI threat detection
async function analyzeWithAI(url: string): Promise<{ threats: string[]; confidence: number; explanation: string }> {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const domain = extractDomain(url);
  const threats: string[] = [];
  let confidence = 0.9;
  let explanation = 'This link appears to be safe based on our analysis.';
  
  // Check for suspicious domain patterns
  if (domain.includes('metamask') && !domain.includes('metamask.io')) {
    threats.push('Potential MetaMask impersonation');
    confidence = 0.8;
    explanation = 'This domain appears to impersonate MetaMask, which is commonly used in phishing attacks.';
  }
  
  if (domain.includes('coinbase') && !domain.includes('coinbase.com')) {
    threats.push('Potential Coinbase impersonation');
    confidence = 0.85;
    explanation = 'This domain appears to impersonate Coinbase, which is commonly used in phishing attacks.';
  }
  
  // Check for suspicious TLDs
  const suspiciousTlds = ['.tk', '.ml', '.ga', '.cf'];
  if (suspiciousTlds.some(tld => domain.endsWith(tld))) {
    threats.push('Suspicious top-level domain');
    confidence = 0.7;
    explanation = 'This domain uses a TLD commonly associated with malicious websites.';
  }
  
  // Check for URL shorteners
  if (SUSPICIOUS_PATTERNS.some(pattern => pattern.test(url))) {
    threats.push('URL shortener detected');
    confidence = 0.6;
    explanation = 'This is a shortened URL which could hide the actual destination. Exercise caution.';
  }
  
  return { threats, confidence, explanation };
}

export async function scanLink(url: string): Promise<ApiResponse<ScanResult>> {
  try {
    // Validate URL format
    try {
      new URL(url);
    } catch {
      return {
        success: false,
        error: 'Invalid URL format',
        data: {
          status: 'danger',
          confidence: 1,
          threats: ['Invalid URL'],
          explanation: 'The provided URL is not in a valid format.',
        },
      };
    }
    
    // Run both checks in parallel
    const [phishingResult, aiResult] = await Promise.all([
      checkPhishingDatabase(url),
      analyzeWithAI(url),
    ]);
    
    // Determine overall result
    let status: 'safe' | 'warning' | 'danger' = 'safe';
    let allThreats: string[] = [...aiResult.threats];
    let explanation = aiResult.explanation;
    let confidence = aiResult.confidence;
    
    if (phishingResult.isMalicious) {
      status = 'danger';
      allThreats.unshift(`Known ${phishingResult.threatType} site`);
      explanation = `This URL is flagged in our threat database as a ${phishingResult.threatType} site. Do not proceed.`;
      confidence = 0.95;
    } else if (aiResult.threats.length > 0) {
      status = aiResult.confidence < 0.7 ? 'warning' : 'danger';
    }
    
    const recommendations: string[] = [];
    if (status === 'danger') {
      recommendations.push('Do not click this link or enter any personal information');
      recommendations.push('Report this link to help protect others');
    } else if (status === 'warning') {
      recommendations.push('Proceed with caution and verify the source');
      recommendations.push('Do not enter sensitive information unless you trust the source');
    }
    
    return {
      success: true,
      data: {
        status,
        confidence,
        threats: allThreats,
        explanation,
        recommendations,
      },
    };
  } catch (error) {
    console.error('Error scanning link:', error);
    return {
      success: false,
      error: 'Failed to scan link. Please try again.',
      data: {
        status: 'warning',
        confidence: 0,
        threats: ['Scan failed'],
        explanation: 'Unable to complete security scan. Exercise caution.',
      },
    };
  }
}

export async function reportScamLink(url: string, userId?: string): Promise<ApiResponse<{ reported: boolean }>> {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Mock successful report
    return {
      success: true,
      data: { reported: true },
      message: 'Thank you for reporting this link. It will be reviewed by our security team.',
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to report link. Please try again.',
      data: { reported: false },
    };
  }
}
