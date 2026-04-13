import { test, expect } from '@playwright/test';

test.describe('E-commerce Flow', () => {
  test('should complete a full item-to-cart journey', async ({ page }) => {
    // 1. Visit Home
    await page.goto('/');
    
    // 2. Find a product link from Featured Products or Categories
    // We target the first "View Details" or similar link if possible
    const firstProduct = page.locator('a[href^="/products/"]').first();
    await expect(firstProduct).toBeVisible();
    await firstProduct.click();

    // 3. Verify on Product Page
    await expect(page).toHaveURL(/\/products\//);
    const productName = await page.locator('h1').textContent();
    expect(productName).toBeTruthy();

    // 4. Add to Bag
    const addToBagButton = page.getByRole('button', { name: /Add to Bag/i });
    await expect(addToBagButton).toBeVisible();
    await addToBagButton.click();

    // 5. Verify Success Message
    await expect(page.getByText(/Added to your bag/i)).toBeVisible();

    // 6. Go to Cart
    await page.goto('/cart');
    
    // 7. Verify Item is in Cart
    await expect(page).toHaveURL('/cart');
    const cartItem = page.locator('text=' + productName);
    // Since we don't know the exact product name, we check if at least one item is listed
    // Or if the specific one we just added is present
    await expect(page.locator('.container-tight')).toContainText(productName || "");
  });
});
