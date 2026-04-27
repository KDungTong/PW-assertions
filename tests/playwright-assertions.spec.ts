import { test, expect } from '@playwright/test';

/**
 * Comprehensive Playwright Assertions Reference Guide.
 * Structure: Organized into 5 practical categories.
 */

test.describe('Playwright Assertions Mastery - Complete 26 Assertions Reference', () => {

  test('1. Element State Assertions', async ({ page }) => {
    const button = page.locator('#submit-btn');
    const checkbox = page.locator('#terms');

    await test.step('Verify element visibility & interactivity', async () => {
      // 1. toBeVisible(): Element is visible on page
      await expect(button).toBeVisible();
      
      // 2. toBeHidden(): Element is not visible (or does not exist)
      await expect(page.locator('#loading-spinner')).toBeHidden();

      // 3. toBeEnabled(): Element is interactive (not disabled)
      await expect(button).toBeEnabled();

      // 4. toBeDisabled(): Element is disabled
      await expect(page.locator('#disabled-btn')).toBeDisabled();

      // 5. toBeChecked(): Checkbox or radio button is checked
      await expect(checkbox).toBeChecked();

      // 6. toBeFocused(): Element has keyboard focus
      await expect(button).toBeFocused();
    });
  });

  test('2. Text & Content Assertions', async ({ page }) => {
    const header = page.locator('h1');
    const input = page.locator('#username');
    const listItems = page.locator('.item');

    await test.step('Verify text and attributes', async () => {
      // 7. toHaveText(): Exact text match
      await expect(header).toHaveText('Welcome to Playwright');

      // 8. toContainText(): Contains a substring
      await expect(header).toContainText('Playwright');

      // 9. toHaveValue(): Verify input field value
      await expect(input).toHaveValue('admin');

      // 10. toHaveAttribute(): Verify element attribute (e.g., placeholder, src)
      await expect(input).toHaveAttribute('placeholder', 'Enter username');

      // 11. toHaveClass(): Verify CSS class (supports Regex)
      await expect(header).toHaveClass(/main-title/);

      // 12. toHaveCount(): Verify number of elements in a list
      await expect(listItems).toHaveCount(5);
    });
  });

  test('3. Page Level Assertions', async ({ page }) => {
    await test.step('Verify page status and UI', async () => {
      // 13. toHaveTitle(): Verify browser tab title
      await expect(page).toHaveTitle(/Dashboard/);

      // 14. toHaveURL(): Verify current page URL
      await expect(page).toHaveURL(/.*\/dashboard/);

      // 15. toHaveCSS(): Verify specific CSS property
      const box = page.locator('.box');
      await expect(box).toHaveCSS('background-color', 'rgb(255, 0, 0)');

      // 16. toHaveScreenshot(): Visual testing (comparison with baseline)
      await expect(page).toHaveScreenshot('landing-page.png');
    });
  });

  test('4. API Response Assertions', async ({ request }) => {
    const response = await request.get('/api/v1/status');
    const data = await response.json();

    await test.step('Verify API status and data structure', async () => {
      // 17. toBeOK(): Response status code is within 200-299
      expect(response).toBeOK();

      // 18. toBe(): Strict equality check
      expect(response.status()).toBe(200);

      // 19. toContain(): Check if array or string contains the element
      expect(data.roles).toContain('admin');

      // 20. toBeTruthy(): Ensure value is not falsy (null/undefined/false)
      expect(data.isActive).toBeTruthy();

      // 21. toHaveLength(): Verify length of array or string
      expect(data.users).toHaveLength(10);
    });
  });

  test('5. Advanced Assertions', async ({ page }) => {
    await test.step('Soft assertions & Custom waiting logic', async () => {
      // 22. expect.soft(): Test continues even if assertion fails (useful for non-critical UI checks)
      await expect.soft(page.locator('#sidebar')).toBeVisible();

      // 23. toPass(): Retry logic until pass or timeout
      await expect(async () => {
        const response = await page.request.get('/api/check-status');
        expect(response.status()).toBe(200);
      }).toPass({ timeout: 5000 });

      // 24. expect.poll(): Polling a function until it meets a condition
      await expect.poll(async () => {
        return await page.locator('.status-label').textContent();
      }, { message: 'Wait for status to become Completed' }).toBe('Completed');

      // 25. toMatchObject(): Partial object match
      const user = { id: 1, name: 'QA', role: 'Lead' };
      expect(user).toMatchObject({ role: 'Lead' });

      // 26. toBeGreaterThan(): Numeric comparison
      const count = 10;
      expect(count).toBeGreaterThan(5);
    });
  });
});