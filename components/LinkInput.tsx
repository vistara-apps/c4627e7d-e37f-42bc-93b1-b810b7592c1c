'use client';

import { useState } from 'react';
import { ActionButton } from './ActionButton';
import { scanLink } from '../lib/api';
import { ScanResult } from '../lib/types';
import { isValidUrl } from '../lib/utils';

interface LinkInputProps {
  onScanStart: () => void;
  onScanComplete: (url: string, result: ScanResult) => void;
}

export function LinkInput({ onScanStart, onScanComplete }: LinkInputProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!url.trim()) {
      setError('Please enter a URL to scan');
      return;
    }

    if (!isValidUrl(url.trim())) {
      setError('Please enter a valid URL (include http:// or https://)');
      return;
    }

    onScanStart();

    try {
      const response = await scanLink(url.trim());
      
      if (response.success) {
        onScanComplete(url.trim(), response.data);
      } else {
        setError(response.error || 'Failed to scan link');
      }
    } catch (error) {
      console.error('Scan error:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      setError('');
    } catch (error) {
      console.error('Failed to read clipboard:', error);
      setError('Unable to access clipboard. Please paste manually.');
    }
  };

  return (
    <div className="bg-surface rounded-lg p-6 shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="relative">
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError('');
              }}
              placeholder="Paste Link Here"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
              autoComplete="off"
              spellCheck="false"
            />
            <button
              type="button"
              onClick={handlePaste}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-sm text-primary hover:bg-primary/10 rounded transition duration-100"
            >
              Paste
            </button>
          </div>
          {error && (
            <p className="mt-2 text-sm font-light text-destructive" role="alert">
              {error}
            </p>
          )}
        </div>

        <ActionButton
          type="submit"
          variant="primary"
          disabled={!url.trim()}
          className="w-full"
        >
          Check for Scams
        </ActionButton>
      </form>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-sm font-light text-gray-600 text-center">
          Free tier: 5 scans per day
        </p>
      </div>
    </div>
  );
}
