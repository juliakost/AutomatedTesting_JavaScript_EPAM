const { test, expect } = require("@playwright/test"); // Import Playwright test utilities
const { GlobalSearch } = require("../pages/globalSearchPage.js"); // Import the globalSearch POM class

// Wrap your test cases in a test.describe block
test.describe('Search is run from EPAM main page', () => {
 test.use({storageState: 'state.json'});

  test.beforeEach(async ({ page }) => {
    // Navigate to the Epam home page
    await page.goto("https://www.epam.com");
  });

  test('Verify that user is able to search from EPAM main page', async ({page,}) => {
    // Step 1: Create an instance of the ContactPage class
    const epamSearch = new GlobalSearch(page);
    await epamSearch.search('Cloud');
});
  
});
