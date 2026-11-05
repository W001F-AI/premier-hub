import { OFFICIAL_NUMBERS } from './premierData';

const STORAGE_KEY = 'orange_premier_numbers_inventory_v1';

// Helper to format raw numbers to Egyptian 11-digit formatted display
export function formatEgyptianNumber(input) {
  let cleaned = String(input).replace(/\D/g, '');
  
  // If starts with 12 or 10 or 11 or 15 without leading zero, prepend 0
  if (cleaned.length === 10 && cleaned.startsWith('1')) {
    cleaned = '0' + cleaned;
  }
  
  if (cleaned.length === 11) {
    // 012 3109 6222
    return {
      rawNumber: cleaned,
      formatted: `${cleaned.slice(0, 3)} ${cleaned.slice(3, 7)} ${cleaned.slice(7)}`,
      msisdn: cleaned.startsWith('0') ? cleaned.slice(1) : cleaned,
      series: `سلسلة ${cleaned.slice(3, 7)}`
    };
  }
  
  return {
    rawNumber: cleaned,
    formatted: cleaned,
    msisdn: cleaned,
    series: 'مخصص'
  };
}

// Load numbers from localStorage or fallback to OFFICIAL_NUMBERS
export function getStoredNumbers() {
  if (typeof window === 'undefined') return OFFICIAL_NUMBERS;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load numbers from storage', e);
  }
  return OFFICIAL_NUMBERS;
}

// Save numbers to localStorage
export function saveStoredNumbers(numbers) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(numbers));
  } catch (e) {
    console.error('Failed to save numbers to storage', e);
  }
}

// Parse bulk text (supports Excel copy-paste, commas, newlines, tabs)
export function parseBulkNumbersText(text) {
  if (!text || typeof text !== 'string') return [];
  
  const lines = text.split(/[\r\n,;]+/);
  const parsed = [];
  const seen = new Set();

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    // Extract first phone sequence
    const digits = line.replace(/\D/g, '');
    if (digits.length >= 9 && digits.length <= 12) {
      const { rawNumber, formatted, msisdn, series } = formatEgyptianNumber(digits);
      
      if (!seen.has(rawNumber)) {
        seen.add(rawNumber);
        parsed.push({
          id: `num-custom-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          msisdn,
          rawNumber,
          formatted,
          series,
          badge: series,
          highlight: `نهاية ${rawNumber.slice(-4)}`,
          dateAdded: new Date().toISOString()
        });
      }
    }
  }

  return parsed;
}
