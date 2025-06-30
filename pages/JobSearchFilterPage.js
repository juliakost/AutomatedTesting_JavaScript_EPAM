const { expect } = require("@playwright/test");

class CareesJobSearchFilterPage {
  // Define locators and the page object
  constructor(page) {
    this.page = page;

    // Locators
    this.keywordInput = page.getByRole("textbox", { name: "Keyword or job ID" });
    this.locationInput = page.locator('span.select2-selection.select2-selection--single');
    this.jobTypeSelect = page.getByText("All Skills");
    this.submitButton = page.getByRole("button", { name: "Find" });
    this.searchResulFirst = page.locator('.search-result-item:first-child');
  }
}
module.exports = { CareesJobSearchFilterPage };