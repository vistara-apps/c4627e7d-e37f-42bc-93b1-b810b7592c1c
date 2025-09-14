'use client';

import { useState } from 'react';
import { Shield, AlertTriangle, XCircle, ExternalLink, Flag } from 'lucide-react';
import { ActionButton } from './ActionButton';
import { ScanResult } from '../lib/types';
import { truncateUrl } from '../lib/utils';
import { reportScamLink } from '../lib/api';

interface ResultCardProps {
  result: ScanResult;
  url: string;
  onNewScan: () => void;
}

export function ResultCard({ result, url, onNewScan }: ResultCardProps) {
  const [isReporting, setIsReporting] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  const getStatusConfig = () => {
    switch (result.status) {
      case 'safe':
        return {
          icon: Shield,
          color: 'text-accent',
          bgColor: 'bg-accent/10',
          borderColor: 'border-accent/20',
          title: 'Link is Safe',
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20',
          title: 'Proceed with Caution',
        };
      case 'danger':
        return {
          icon: XCircle,
          color: 'text-danger',
          bgColor: 'bg-danger/10',
          borderColor: 'border-danger/20',
          title: 'Dangerous Link Detected',
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  const handleReport = async () => {
    setIsReporting(true);
    try {
      const response = await reportScamLink(url);
      if (response.success) {
        setReportSuccess(true);
      }
    } catch (error) {
      console.error('Failed to report link:', error);
    } finally {
      setIsReporting(false);
    }
  };

  const handleVisitLink = () => {
    if (result.status === 'safe') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={`bg-surface rounded-lg p-6 shadow-lg border-2 ${config.borderColor}`}>
      {/* Status Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${config.bgColor}`}>
          <Icon className={`w-6 h-6 ${config.color}`} />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-foreground">{config.title}</h3>
          <p className="text-sm text-gray-600">
            Confidence: {Math.round(result.confidence * 100)}%
          </p>
        </div>
      </div>

      {/* URL Display */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-1">Scanned URL:</p>
        <p className="text-base font-mono text-sm break-all">
          {truncateUrl(url, 60)}
        </p>
      </div>

      {/* Explanation */}
      <div className="mb-4">
        <p className="text-base text-foreground">{result.explanation}</p>
      </div>

      {/* Threats */}
      {result.threats.length > 0 && (
        <div className="mb-4">
          <h4 className="text-base font-semibold text-foreground mb-2">Detected Issues:</h4>
          <ul className="space-y-1">
            {result.threats.map((threat, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-destructive rounded-full flex-shrink-0"></div>
                {threat}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      {result.recommendations && result.recommendations.length > 0 && (
        <div className="mb-6">
          <h4 className="text-base font-semibold text-foreground mb-2">Recommendations:</h4>
          <ul className="space-y-1">
            {result.recommendations.map((rec, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      <div className="space-y-3">
        <div className="flex gap-3">
          <ActionButton
            variant="primary"
            onClick={onNewScan}
            className="flex-1"
          >
            Scan Another Link
          </ActionButton>
          
          {result.status === 'safe' && (
            <ActionButton
              variant="secondary"
              onClick={handleVisitLink}
              className="flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Visit
            </ActionButton>
          )}
        </div>

        {/* Report Button */}
        {result.status !== 'safe' && !reportSuccess && (
          <ActionButton
            variant="secondary"
            onClick={handleReport}
            disabled={isReporting}
            className="w-full flex items-center justify-center gap-2"
          >
            <Flag className="w-4 h-4" />
            {isReporting ? 'Reporting...' : 'Report as Scam'}
          </ActionButton>
        )}

        {reportSuccess && (
          <div className="text-center p-3 bg-accent/10 rounded-lg">
            <p className="text-sm text-accent font-medium">
              Thank you for reporting! This helps keep everyone safe.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
