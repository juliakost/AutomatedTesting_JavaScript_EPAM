const { expect } = require("@playwright/test");

class CareesJobSearchFilterPage {
  // Define locators and the page object
  constructor(page) {
    this.page = page;

    // Locators
    this.keywordInput = page.getByRole("textbox", { name: "Keyword or job ID" });
    this.locationInput = page.locator('span.select2-selection.select2-selection--single');
    this.locationCombobox = page.getByRole("combobox").filter({ hasText: /^$/ });
    this.allCitiesOption = page.getByRole("option").filter({ hasText: 'All Cities' });
    this.jobTypeInput = page.getByText("All Skills");
    this.jobTypeSelect = page.getByRole("treeitem").nth(0);
    this.submitButton = page.getByRole("button", { name: "Find" });
    this.searchResultsList = page.locator('.search-result__list');
    this.searchResultItem = page.locator('.search-result__item');
  }
  async goto() {
    await this.page.goto("https://www.epam.com/careers");
  }

   async fillKeyword(keyword) {
    await this.keywordInput.fill(keyword);
  }

  async fillLocation(location) {
  await this.locationInput.click();
  await this.locationCombobox.fill(location);
  await this.allCitiesOption.click();
  }

  async selectJobType() {
    await this.jobTypeInput.click();
    await this.jobTypeSelect.click();
  }

  async submitSearch() {
    await this.submitButton.click();
  }

   async waitForSearchResults() {
    await expect(this.searchResultsList).toBeVisible();
  }

  async expectFirstSearchResultToContainText(text) {
    await expect(this.searchResultItem.first()).toContainText(text);
  }

}
module.exports = { CareesJobSearchFilterPage };