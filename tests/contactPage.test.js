const { test, expect } = require('@playwright/test'); // Import Playwright test utilities
const { ContactPage } = require('../pages/ContactPage'); // Import the ContactPage POM class

// Wrap your test cases in a test.describe block
test.describe('Contact Page Tests', () => {
    test.use({storageState: 'state.json'});

  test.beforeEach(async ({ page }) => {
    // Navigate to the Epam home page
    await page.goto("https://www.epam.com");
  });
  test('should navigate to Contact Us page and submit a form', async ({ page }) => {
    // Step 1: Create an instance of the ContactPage class
    const contactPage = new ContactPage(page);

    // Step 2: Navigate to the Contact Us page
    await contactPage.navigateTo();

    // Step 3: Verify that the "Contact Us" header is visible
    await contactPage.verifyContactHeader();

    // Step 4: Fill in the "Ask Us Anything" form
    const firstName = 'John';
    const lastName = 'Doe';
    const email = 'john.doe@example.com';
    const phone = '+1234567890';
    const whereDidYouHear = 'Partner'; // Adjust depending on dropdown options

    await contactPage.personalInfoInput(firstName, lastName, email, phone, whereDidYouHear);

    // Step 5: Submit the form
    await contactPage.clickSumbit();

    // Step 6: Validate the "Thank You" confirmation message is displayed
    await expect(contactPage.thankYou).toBeVisible();
  });
});