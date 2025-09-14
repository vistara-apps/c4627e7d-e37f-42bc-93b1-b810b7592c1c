'use client';

import { useState } from 'react';
import { LinkInput } from './LinkInput';
import { ResultCard } from './ResultCard';
import { ScanResult } from '../lib/types';

export function AppShell() {
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedUrl, setScannedUrl] = useState<string>('');

  const handleScanComplete = (url: string, result: ScanResult) => {
    setScannedUrl(url);
    setScanResult(result);
    setIsScanning(false);
  };

  const handleScanStart = () => {
    setIsScanning(true);
    setScanResult(null);
  };

  const handleNewScan = () => {
    setScanResult(null);
    setScannedUrl('');
    setIsScanning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-300 to-sky-400 px-4 py-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="display text-white mb-2 text-balance">
            Scam Link Detector
          </h1>
          <p className="caption text-white/80 text-balance">
            Scan links for scams, instantly.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {!scanResult && !isScanning && (
            <LinkInput 
              onScanStart={handleScanStart}
              onScanComplete={handleScanComplete}
            />
          )}

          {isScanning && (
            <div className="bg-surface rounded-lg p-6 shadow-card text-center">
              <div className="animate-pulse-slow mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full mx-auto flex items-center justify-center">
                  <div className="w-6 h-6 bg-primary rounded-full animate-ping"></div>
                </div>
              </div>
              <h3 className="body font-semibold text-text mb-2">Scanning...</h3>
              <p className="caption text-gray-600">
                Checking link against our security database
              </p>
            </div>
          )}

          {scanResult && (
            <ResultCard 
              result={scanResult}
              url={scannedUrl}
              onNewScan={handleNewScan}
            />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="caption text-white/60">
            Powered by AI threat intelligence
          </p>
        </div>
      </div>
    </div>
  );
}
