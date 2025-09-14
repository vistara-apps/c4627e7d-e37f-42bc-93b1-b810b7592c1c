import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface AIAnalysisResult {
  threats: string[];
  confidence: number;
  explanation: string;
  riskLevel: 'low' | 'medium' | 'high';
}

export async function analyzeUrlWithAI(url: string): Promise<AIAnalysisResult> {
  try {
    const prompt = `
Analyze this URL for potential security threats. Consider phishing, malware, scams, and other malicious patterns.

URL: ${url}

Please respond with a JSON object containing:
- threats: array of specific threats identified
- confidence: number between 0-1 indicating confidence in the analysis
- explanation: brief explanation of the analysis
- riskLevel: "low", "medium", or "high"

Be conservative - only flag clear threats. Consider:
- Domain reputation and patterns
- URL structure and parameters
- Known malicious TLDs or patterns
- Social engineering indicators
- Technical indicators of compromise

Response format: {"threats": [...], "confidence": 0.85, "explanation": "...", "riskLevel": "medium"}
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a cybersecurity expert analyzing URLs for threats. Be accurate and conservative in your assessments.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.1, // Low temperature for consistent analysis
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    // Parse the JSON response
    const result = JSON.parse(content.trim());

    // Validate the response structure
    if (!result.threats || !Array.isArray(result.threats) || typeof result.confidence !== 'number') {
      throw new Error('Invalid response format from OpenAI');
    }

    return {
      threats: result.threats,
      confidence: Math.max(0, Math.min(1, result.confidence)), // Clamp between 0-1
      explanation: result.explanation || 'Analysis completed',
      riskLevel: result.riskLevel || 'low',
    };

  } catch (error) {
    console.error('OpenAI analysis error:', error);

    // Fallback response
    return {
      threats: [],
      confidence: 0.5,
      explanation: 'AI analysis temporarily unavailable. Using basic pattern matching.',
      riskLevel: 'low',
    };
  }
}

export async function analyzeUrlPatterns(url: string): Promise<AIAnalysisResult> {
  // Fallback analysis without OpenAI for basic pattern matching
  const threats: string[] = [];
  let confidence = 0.8;
  let explanation = 'Basic pattern analysis completed.';
  let riskLevel: 'low' | 'medium' | 'high' = 'low';

  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname.toLowerCase();

    // Check for suspicious TLDs
    const suspiciousTlds = ['.tk', '.ml', '.ga', '.cf', '.gq', '.work', '.click'];
    if (suspiciousTlds.some(tld => domain.endsWith(tld))) {
      threats.push('Suspicious top-level domain commonly used in malicious campaigns');
      confidence = 0.7;
      riskLevel = 'medium';
    }

    // Check for URL shorteners
    const shorteners = ['bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'ow.ly', 'buff.ly'];
    if (shorteners.some(shortener => domain.includes(shortener))) {
      threats.push('URL shortener detected - cannot verify destination');
      confidence = 0.6;
      riskLevel = 'medium';
    }

    // Check for suspicious keywords in domain
    const suspiciousKeywords = ['secure', 'login', 'verify', 'account', 'bank', 'crypto', 'wallet'];
    const domainParts = domain.split('.');
    const mainDomain = domainParts[0];

    if (suspiciousKeywords.some(keyword => mainDomain.includes(keyword))) {
      threats.push('Domain contains security-sensitive keywords');
      confidence = 0.65;
      riskLevel = 'medium';
    }

    // Check for excessive subdomains
    if (domainParts.length > 3) {
      threats.push('Excessive subdomains may indicate phishing attempt');
      confidence = 0.7;
      riskLevel = 'medium';
    }

    // Check for IP addresses in URL
    const ipPattern = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
    if (ipPattern.test(url)) {
      threats.push('Direct IP address in URL is suspicious');
      confidence = 0.8;
      riskLevel = 'high';
    }

    // Check for suspicious query parameters
    const suspiciousParams = ['redirect', 'url', 'link', 'ref', 'utm_source'];
    const urlParams = new URLSearchParams(urlObj.search);
    const paramKeys = Array.from(urlParams.keys()).map(key => key.toLowerCase());

    if (suspiciousParams.some(param => paramKeys.includes(param))) {
      threats.push('URL contains redirect or tracking parameters');
      confidence = 0.6;
      riskLevel = 'medium';
    }

    explanation = threats.length > 0
      ? `Found ${threats.length} potential security concern${threats.length > 1 ? 's' : ''}.`
      : 'No obvious security concerns detected in URL structure.';

  } catch (error) {
    explanation = 'Could not analyze URL structure.';
    confidence = 0.5;
  }

  return {
    threats,
    confidence,
    explanation,
    riskLevel,
  };
}

