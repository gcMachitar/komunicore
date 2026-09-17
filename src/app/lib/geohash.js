/**
 * Level-7 Geohash Generator for Philippine Barangay Residency Verification
 * Precision Level 7 ≈ ±0.076km × 0.076km (~1.2km grid when accounting for error margins)
 *
 * Base-32 encoding using Geohash standard character set.
 */

const BASE32 = '0123456789bcdefghjkmnpqrstuvwxyz';

/**
 * Encode latitude/longitude to a geohash string.
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {number} precision - Number of characters (default 7)
 * @returns {string} Geohash string
 */
export function encodeGeohash(lat, lng, precision = 7) {
  let latRange = [-90, 90];
  let lngRange = [-180, 180];
  let isLng = true;
  let bit = 0;
  let charIndex = 0;
  let hash = '';

  while (hash.length < precision) {
    if (isLng) {
      const mid = (lngRange[0] + lngRange[1]) / 2;
      if (lng >= mid) {
        charIndex = charIndex * 2 + 1;
        lngRange[0] = mid;
      } else {
        charIndex = charIndex * 2;
        lngRange[1] = mid;
      }
    } else {
      const mid = (latRange[0] + latRange[1]) / 2;
      if (lat >= mid) {
        charIndex = charIndex * 2 + 1;
        latRange[0] = mid;
      } else {
        charIndex = charIndex * 2;
        latRange[1] = mid;
      }
    }

    isLng = !isLng;
    bit++;

    if (bit === 5) {
      hash += BASE32[charIndex];
      bit = 0;
      charIndex = 0;
    }
  }

  return hash;
}

/**
 * Philippine barangay coordinate presets for simulation.
 * These represent actual barangay centers in disaster-prone areas.
 */
export const PH_BARANGAY_COORDS = {
  'Brgy. San Jose': { lat: 14.5995, lng: 120.9842 },
  'Brgy. Poblacion': { lat: 14.5547, lng: 121.0244 },
  'Brgy. Malanday': { lat: 14.7340, lng: 121.1130 },
  'Brgy. Bagong Silang': { lat: 14.7350, lng: 121.0560 },
  'Brgy. Batasan Hills': { lat: 14.6760, lng: 121.0960 },
  'Brgy. Commonwealth': { lat: 14.6950, lng: 121.0870 },
  'Brgy. Payatas': { lat: 14.7100, lng: 121.1040 },
  'Brgy. Tatalon': { lat: 14.6230, lng: 121.0110 },
};

/**
 * Generate a simulated geohash for a purok/barangay with slight randomization
 * to simulate GPS jitter within the 1.2km grid.
 * @param {string} barangay - Barangay name
 * @returns {{ geohash: string, lat: number, lng: number }}
 */
export function generateResidentGeohash(barangay) {
  const coords = PH_BARANGAY_COORDS[barangay] || PH_BARANGAY_COORDS['Brgy. San Jose'];

  // Add GPS jitter (±0.005 degrees ≈ ~500m)
  const lat = coords.lat + (Math.random() - 0.5) * 0.01;
  const lng = coords.lng + (Math.random() - 0.5) * 0.01;
  const geohash = encodeGeohash(lat, lng, 7);

  return { geohash, lat: Math.round(lat * 10000) / 10000, lng: Math.round(lng * 10000) / 10000 };
}

/**
 * Validate that two geohashes share the same Level-5 prefix (within ~4.9km).
 * Used to verify a resident is within the barangay jurisdiction.
 * @param {string} hash1
 * @param {string} hash2
 * @returns {boolean}
 */
export function isWithinBarangay(hash1, hash2) {
  return hash1.substring(0, 5) === hash2.substring(0, 5);
}
