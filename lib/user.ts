import { User } from './types';

const FREE_DAILY_SCANS = 5;
const PREMIUM_MONTHLY_PRICE = 5; // $5/month
const PREMIUM_PRICE_PER_SCAN = 0.01; // $0.01 per scan

// In-memory user store (in production, use a database)
const userStore = new Map<string, User>();

export function getOrCreateUser(userId: string): User {
  if (!userStore.has(userId)) {
    userStore.set(userId, {
      userId,
      scanCount: 0,
      premiumStatus: false,
      lastScanTimestamp: new Date(),
    });
  }
  return userStore.get(userId)!;
}

export function canUserScan(userId: string): { canScan: boolean; reason?: string; remainingScans?: number } {
  const user = getOrCreateUser(userId);
  const now = new Date();
  const lastScan = user.lastScanTimestamp;

  // Reset daily count if it's a new day
  const isNewDay = now.toDateString() !== lastScan.toDateString();
  if (isNewDay) {
    user.scanCount = 0;
  }

  if (user.premiumStatus) {
    return { canScan: true };
  }

  if (user.scanCount >= FREE_DAILY_SCANS) {
    return {
      canScan: false,
      reason: `Daily free scan limit reached (${FREE_DAILY_SCANS}). Upgrade to premium for unlimited scans.`,
      remainingScans: 0,
    };
  }

  return {
    canScan: true,
    remainingScans: FREE_DAILY_SCANS - user.scanCount,
  };
}

export function recordScan(userId: string): void {
  const user = getOrCreateUser(userId);
  user.scanCount += 1;
  user.lastScanTimestamp = new Date();
}

export function upgradeToPremium(userId: string): void {
  const user = getOrCreateUser(userId);
  user.premiumStatus = true;
}

export function getUserStats(userId: string): {
  scanCount: number;
  isPremium: boolean;
  remainingScans: number;
  nextReset: Date;
} {
  const user = getOrCreateUser(userId);
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const remainingScans = user.premiumStatus ? Infinity : Math.max(0, FREE_DAILY_SCANS - user.scanCount);

  return {
    scanCount: user.scanCount,
    isPremium: user.premiumStatus,
    remainingScans: remainingScans === Infinity ? -1 : remainingScans, // -1 indicates unlimited
    nextReset: tomorrow,
  };
}

export function calculateScanCost(scanCount: number): number {
  return scanCount * PREMIUM_PRICE_PER_SCAN;
}

export function getPricingInfo() {
  return {
    freeDailyScans: FREE_DAILY_SCANS,
    premiumMonthlyPrice: PREMIUM_MONTHLY_PRICE,
    premiumPricePerScan: PREMIUM_PRICE_PER_SCAN,
  };
}

