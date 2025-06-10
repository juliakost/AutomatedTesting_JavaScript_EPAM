
import { test, expect } from '@playwright/test';

test.describe('Header Search Button', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the Epam home page
    await page.goto('https://www.epam.com'); 
  });

  test('should be visible on the homepage', async ({ page }) => {
    const searchButton = page.locator('button.header-search__button.header__icon');
    await expect(searchButton).toBeVisible();
  });

  test('should open search panel on click', async ({ page }) => {
    const searchButton = page.locator('button.header-search__button.header__icon');
    const searchPanel = page.locator('.header-search__panel'); 

    await expect(searchPanel).not.toBeVisible(); // Ensure panel is hidden initially
    await searchButton.click();
    await expect(searchPanel).toBeVisible(); // Assert panel is now visible
  });

});
