/**
 * AI Expiry Triage Engine
 * Classifies supply items by expiration urgency to optimize distribution priority.
 */

/**
 * Triage status constants
 */
export const TRIAGE_STATUS = {
  SAFE: 'Safe',
  NEAR_EXPIRY: 'Near Expiry - Fast Track',
  EXPIRED: 'Expired',
};

/**
 * Calculate days until expiry from a date string.
 * @param {string} expiryDate - ISO date string
 * @returns {number} Days remaining (negative if expired)
 */
export function daysUntilExpiry(expiryDate) {
  const now = new Date();
  const expiry = new Date(expiryDate);
  const diffMs = expiry.getTime() - now.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Get triage status for a supply item.
 * @param {string} expiryDate - ISO date string
 * @returns {{ status: string, daysLeft: number, color: string, priority: number }}
 */
export function getTriageStatus(expiryDate) {
  const daysLeft = daysUntilExpiry(expiryDate);

  if (daysLeft < 0) {
    return {
      status: TRIAGE_STATUS.EXPIRED,
      daysLeft,
      color: 'red',
      priority: 0, // Highest priority for removal
    };
  }

  if (daysLeft <= 30) {
    return {
      status: TRIAGE_STATUS.NEAR_EXPIRY,
      daysLeft,
      color: 'amber',
      priority: 1, // Distribute first
    };
  }

  return {
    status: TRIAGE_STATUS.SAFE,
    daysLeft,
    color: 'emerald',
    priority: 2, // Normal distribution
  };
}

/**
 * Sort inventory items by triage priority (expired first, then near-expiry, then safe).
 * @param {Array} items - Array of inventory items with expiryDate
 * @returns {Array} Sorted array
 */
export function sortByTriagePriority(items) {
  return [...items].sort((a, b) => {
    const aStatus = getTriageStatus(a.expiryDate);
    const bStatus = getTriageStatus(b.expiryDate);
    if (aStatus.priority !== bStatus.priority) return aStatus.priority - bStatus.priority;
    return aStatus.daysLeft - bStatus.daysLeft;
  });
}
