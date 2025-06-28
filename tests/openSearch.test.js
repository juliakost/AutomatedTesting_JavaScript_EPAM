/*Test case #1: Opening of search panel
Navigate to https://www.epam.com/
Click Search button
Check that Search panel is opened*/

import { test, expect } from "@playwright/test";

test.describe("Header Search Button", () => {

  test.use({storageState: 'state.json'});

  test.beforeEach(async ({ page }) => {
    // Navigate to the Epam home page
    await page.goto("https://www.epam.com");
  });

  test("should be visible on the homepage", async ({ page }) => {
    const searchButton = page.locator(
      "button.header-search__button.header__icon"
    );
    await expect(searchButton).toBeVisible();
  });

  test("should open search panel on click", async ({ page }) => {
    const searchButton = page.locator(
      "button.header-search__button.header__icon"
    );
    const searchPanel = page.locator(".header-search__panel");

    await expect(searchPanel).not.toBeVisible(); // Ensure panel is hidden
    await searchButton.click();
    await expect(searchPanel).toBeVisible(); // Assert panel is now visible
  });
});