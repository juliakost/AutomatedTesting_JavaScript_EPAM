
import { test, expect } from "@playwright/test";

test.describe("Top Navigation Link: About", () => {
  // The link being tested

  const linkSelector = 'a.top-navigation__item-link.js-op:has-text("About")';

  test.beforeEach(async ({ page }) => {
    // Navigate to the Epam home page
    await page.goto('https://www.epam.com'); 
  });

  test("should be visible in the top navigation", async ({ page }) => {
    await page.waitForSelector(linkSelector); // Wait for the link to be present
    const aboutLink = page.locator(linkSelector);
    await expect(aboutLink).toBeVisible();
    await expect(aboutLink).toHaveText("About");
  });

  test('should navigate to the correct page on click', async ({ page }) => {
    const aboutLink = page.locator(linkSelector);
    const targetUrl = 'https://www.epam.com/about'; // The expected destination URL

    // Use waitForURL to wait for the navigation to complete
    await Promise.all([
      page.waitForURL(targetUrl),
      aboutLink.click(),
    ]);

    // Verify the current URL matches the target
    await expect(page).toHaveURL(targetUrl);
    await expect(page.locator("h1")).toHaveText("About");
  });

  test('should close cookie overlay', async ({ page }) => {
    await page.goto('https://www.epam.com/about');
    await expect(page.locator('#onetrust-banner-sdk')).toBeVisible();

    await page.locator('#onetrust-banner-sdk #onetrust-accept-btn-handler').click();
    await expect(page.locator('#onetrust-banner-sdk')).toBeHidden();
   });
});
