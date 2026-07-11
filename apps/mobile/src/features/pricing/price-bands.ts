export type CurrencyCode = 'VND' | 'USD' | 'EUR';

export type PriceBand = {
  id: string;
  minMinor: number | null;
  maxMinor: number | null;
  label: string;
};

export const DEFAULT_CURRENCY: CurrencyCode = 'VND';

export const priceBandsByCurrency: Record<CurrencyCode, PriceBand[]> = {
  VND: [
    { id: 'vnd-under-100', minMinor: null, maxMinor: 100_000, label: 'Under 100k ₫' },
    { id: 'vnd-100-200', minMinor: 100_000, maxMinor: 200_000, label: '100k–200k ₫' },
    { id: 'vnd-200-300', minMinor: 200_000, maxMinor: 300_000, label: '200k–300k ₫' },
    { id: 'vnd-300-500', minMinor: 300_000, maxMinor: 500_000, label: '300k–500k ₫' },
    { id: 'vnd-over-500', minMinor: 500_000, maxMinor: null, label: 'Over 500k ₫' },
  ],
  USD: [
    { id: 'usd-under-5', minMinor: null, maxMinor: 500, label: 'Under $5' },
    { id: 'usd-5-10', minMinor: 500, maxMinor: 1_000, label: '$5–$10' },
    { id: 'usd-10-15', minMinor: 1_000, maxMinor: 1_500, label: '$10–$15' },
    { id: 'usd-15-25', minMinor: 1_500, maxMinor: 2_500, label: '$15–$25' },
    { id: 'usd-over-25', minMinor: 2_500, maxMinor: null, label: 'Over $25' },
  ],
  EUR: [
    { id: 'eur-under-5', minMinor: null, maxMinor: 500, label: 'Under €5' },
    { id: 'eur-5-10', minMinor: 500, maxMinor: 1_000, label: '€5–€10' },
    { id: 'eur-10-15', minMinor: 1_000, maxMinor: 1_500, label: '€10–€15' },
    { id: 'eur-15-25', minMinor: 1_500, maxMinor: 2_500, label: '€15–€25' },
    { id: 'eur-over-25', minMinor: 2_500, maxMinor: null, label: 'Over €25' },
  ],
};

