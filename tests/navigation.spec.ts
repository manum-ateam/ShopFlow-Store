import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('header should contain links to main sections', async ({ page }) => {
    await page.goto('/');
    
    // Check for Home link (Brand name usually)
    const brand = page.getByText(/ShopFlow/i).first();
    await expect(brand).toBeVisible();

    // Check for Cart link in header
    const cartIcon = page.locator('a[href="/cart"]').first();
    await expect(cartIcon).toBeVisible();
  });

  test('should handle 404 for non-existent products', async ({ page }) => {
    await page.goto('/products/invalid-product-id');
    await expect(page.getByText(/Product Not Found/i)).toBeVisible();
  });

  test('footer should contain brand info', async ({ page }) => {
    await page.goto('/');
    // Check for copyright or branding in footer
    await expect(page.getByText(/All rights reserved/i).or(page.getByText(/©/))).toBeVisible();
  });
});
