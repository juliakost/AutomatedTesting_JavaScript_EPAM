const { test, expect } = require("@playwright/test");
const { HamburgerMenu } = require("../pages/hamburgerMenuPage.js");

test.describe("Hamburger Menu Tests", () => {
test.use({storageState: 'state.json'});
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.epam.com");
  });

  test("Verify that user is able to click an item", async ({ page }) => {
    test.setTimeout(60000);
    const hamburgerMenu = new HamburgerMenu(page);

    // Click the 1st menu item (index 0)
    await hamburgerMenu.itemClick(0); // Click "Insights"
  });

  test("Assert the menu contains the specific items", async ({ page }) => {
    const hamburgerMenu = new HamburgerMenu(page);

    const menuItemsText = await hamburgerMenu.getMenuItemsText();

    // Log the menu items
    console.log("Menu items text:", menuItemsText);

    // Assert menu text matches expected items
    expect(menuItemsText).toEqual(["Services", "Industries", "Insights", "About", "Careers"]);
  });
});

