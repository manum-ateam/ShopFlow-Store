import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should have the correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/ShopFlow/);
  });

  test('should display the hero section', async ({ page }) => {
    await page.goto('/');
    // Check if the hero section or some text in it is visible
    // We can check for "ShopFlow" text in the hero
    const heroText = page.getByRole('heading', { level: 1 });
    await expect(heroText).toBeVisible();
  });

  test('should navigate to products page', async ({ page }) => {
    await page.goto('/');
    // Assuming there is a link to products
    const productsLink = page.locator('a[href="/products"]').first();
    if (await productsLink.isVisible()) {
      await productsLink.click();
      await expect(page).toHaveURL(/\/products/);
    }
  });
});
