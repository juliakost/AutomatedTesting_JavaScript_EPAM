const { test, expect } = require("@playwright/test");
const { CareesJobSearchFilterPage } = require("../pages/jobSearchFilterPage.js");

test.describe("Careers job search", () => {
  test.use({ storageState: "state.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.epam.com");
  });


  test("Successful Search with All non-default fileds", async ({
    page,
  }) => {
    const careesJobSearch = new CareesJobSearchFilterPage(page);
    await careesJobSearch.goto();
    
    const keyword = "Software Developer";
    const location = "Poland";

    await careesJobSearch.fillKeyword(keyword);
    
    await careesJobSearch.fillLocation(location);

    await careesJobSearch.selectJobType();

    await careesJobSearch.submitSearch();

    await expect(careesJobSearch.searchResultsList).toBeVisible();

  });

  test('Successful Search with Single Field (Keyword)', async ({ page }) => {
    const careesJobSearch = new CareesJobSearchFilterPage(page);
    await careesJobSearch.goto();

    const keyword = "test";

    await careesJobSearch.fillKeyword(keyword);

    await careesJobSearch.selectJobType();

    await careesJobSearch.submitSearch();

    await expect(careesJobSearch.searchResultsList).toBeVisible();

  }) ;
});
