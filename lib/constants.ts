export const SCAN_LIMITS = {
  FREE_DAILY_SCANS: 5,
  PREMIUM_PRICE_PER_SCAN: 0.01,
  PREMIUM_MONTHLY_PRICE: 5,
} as const;

export const THREAT_TYPES = {
  PHISHING: 'phishing',
  MALWARE: 'malware',
  SCAM: 'scam',
  SUSPICIOUS: 'suspicious',
  FAKE_SITE: 'fake_site',
} as const;

export const SCAN_RESULTS = {
  SAFE: 'safe',
  WARNING: 'warning',
  DANGER: 'danger',
} as const;

export const KNOWN_SAFE_DOMAINS = [
  'google.com',
  'github.com',
  'stackoverflow.com',
  'base.org',
  'coinbase.com',
  'ethereum.org',
] as const;

export const SUSPICIOUS_PATTERNS = [
  /bit\.ly/i,
  /tinyurl/i,
  /t\.co/i,
  /goo\.gl/i,
  /ow\.ly/i,
  /metamask.*\.com/i,
  /coinbase.*\.net/i,
  /ethereum.*\.org/i,
] as const;
