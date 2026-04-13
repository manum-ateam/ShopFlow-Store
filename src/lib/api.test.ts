import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCategories, getProductById } from './api';

describe('API', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  describe('getCategories', () => {
    it('should fetch categories and return data', async () => {
      const mockData = { data: [{ id: '1', name: 'Electronics' }] };
      (fetch as any).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      const categories = await getCategories();
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/categories'));
      expect(categories).toEqual(mockData.data);
    });

    it('should throw error on API failure', async () => {
      (fetch as any).mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({ error: 'Server Error' }),
      });

      await expect(getCategories()).rejects.toThrow('Server Error');
    });
  });

  describe('getProductById', () => {
    it('should fetch product by id', async () => {
      const mockProduct = { data: { id: 'p1', name: 'Test Product' } };
      (fetch as any).mockResolvedValue({
        ok: true,
        json: async () => mockProduct,
      });

      const product = await getProductById('p1');
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/products/p1'));
      expect(product).toEqual(mockProduct.data);
    });
  });
});
