export interface User {
  userId: string;
  scanCount: number;
  premiumStatus: boolean;
  lastScanTimestamp: Date;
}

export interface ScannedLink {
  linkId: string;
  originalUrl: string;
  scanResult: 'safe' | 'warning' | 'danger';
  detectedThreatType?: string;
  timestamp: Date;
  reportedByUserId?: string;
}

export interface ThreatSignature {
  signatureId: string;
  pattern: string;
  type: string;
  source: string;
  createdAt: Date;
}

export interface ScanResult {
  status: 'safe' | 'warning' | 'danger';
  confidence: number;
  threats: string[];
  explanation: string;
  recommendations?: string[];
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}
