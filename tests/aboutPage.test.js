/*Test case #1: Opening of About page
Navigate to https://www.epam.com/
Click About link in header section
Check that About page is opened*/

import { test, expect } from "@playwright/test";

test.describe("Top navigation Link: About", () => {
  // The link being tested

  test.use({storageState: 'state.json'});

  const linkSelector = 'a.top-navigation__item-link.js-op:has-text("About")';
  //The combination of CSS selectors (a, .top-navigation__item-link, .js-op) 
  // and Playwright's pseudo-classes (:has-text)
   const expectedUrl = 'https://www.epam.com/about';
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the Epam home page
    await page.goto('https://www.epam.com'); 
  });

  test("should be visible in the top navigation", async ({ page }) => {
    const aboutLink = page.locator(linkSelector);
    //await page.waitForSelector(linkSelector); // Wait for the link to be present
    await expect(aboutLink).toBeVisible();
    await expect(aboutLink).toHaveText("About");
  });

  test('should navigate to the correct page on click About', async ({ page }) => {
  const aboutLink = page.locator(linkSelector);
  // Click the About link
  await aboutLink.click();
  
  // Wait for the page to navigate to the expected URL
  await page.waitForURL(expectedUrl);
  
  // Expects page to have the needed title
  await expect(page).toHaveTitle(/About/);
});
});