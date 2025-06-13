class GlobalSearch {
  // Define locators and the page object
  constructor(page) {
    this.page = page;

    // Locators
    // Search icon to initiate search
    this.searchButton = page.locator('button.header-search__button');
    // Search input box
    this.searchInput = page.locator('#new_form_search');
    // Button "FIND"
    this.findButton = page.locator('div.search-results__action-section > button');
    // Collection of search results
    this.searchResults = page.locator('article.search-results__item');
  }
  async search(query) {
        await this.searchButton.click();
        await this.searchInput.type(query);
        await this.findButton.click();
    }
}

module.exports = { GlobalSearch };