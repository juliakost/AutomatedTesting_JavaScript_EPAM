const { expect } = require("@playwright/test");
class HamburgerMenu {
  constructor(page) {
    this.page = page;

    // Locators
    this.hamburgerIcon = page.locator("button.hamburger-menu__button");
    this.menuList = page.locator("div.hamburger-menu__dropdown-section");
    this.menuItems = page.locator("ul.hamburger-menu__list li a");
  }

  // Open the menu and click on a specific item
  async itemClick(option) {
    // Open the hamburger menu
    await this.hamburgerIcon.click();
    await expect(this.menuList).toBeVisible(); // Ensure the dropdown is visible
    await this.menuItems.nth(option).click(); // Click the desired menu item
  }

  // Get the text of all visible menu items
  async getMenuItemsText() {
    const count = await this.menuItems.count(); // Dynamically fetch the count
    console.log(`Total menu items found: ${count}`);


    const menuTexts = [];
    for (let i = 0; i < count; i++) {
      const item = this.menuItems.nth(i);

      // Consider only visible items
      if (await item.isVisible()) {
        const text = await item.textContent();
        menuTexts.push(text.trim());
      }
    }

    return menuTexts; // Return an array of visible menu texts
  }
}

module.exports = { HamburgerMenu };