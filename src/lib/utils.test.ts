import { describe, it, expect } from 'vitest';
import { formatCurrency, cn } from './utils';

describe('utils', () => {
  describe('formatCurrency', () => {
    it('should format cents to USD string', () => {
      expect(formatCurrency(100)).toBe('$1.00');
      expect(formatCurrency(1250)).toBe('$12.50');
      expect(formatCurrency(0)).toBe('$0.00');
    });

    it('should handle undefined or null amount', () => {
      expect(formatCurrency(undefined as any)).toBe('$0.00');
      expect(formatCurrency(null as any)).toBe('$0.00');
    });
  });

  describe('cn', () => {
    it('should join class names', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
    });

    it('should filter out falsy values', () => {
      expect(cn('class1', false, 'class2', undefined, null, '', 'class3')).toBe('class1 class2 class3');
    });

    it('should return empty string for no classes', () => {
      expect(cn()).toBe('');
    });
  });
});
