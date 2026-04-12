/** Formats a price in cents into a localized USD string. */
export const formatCurrency = (amountInCents: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format((amountInCents || 0) / 100);
};

/** Helper to conditionally join class names. */
export const cn = (...classes: (string | boolean | undefined | null)[]) => {
  return classes.filter(Boolean).join(" ");
};
