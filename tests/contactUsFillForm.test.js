const { test, expect } = require("@playwright/test"); // Import Playwright test utilities
const { ContactPage } = require("../pages/ContactUsPage"); // Import the ContactPage POM class

// Wrap your test cases in a test.describe block
test.describe('Contact Page "Ask Us Anything" form fill in Tests', () => {
  test.use({ storageState: "state.json" });

  test.beforeEach(async ({ page }) => {
    // Navigate to the "Contact Us" page
    await page.goto("https://www.epam.com/about/who-we-are/contact");
  });

  test("should navigate to Contact Us page and submit a form", async ({
    page,
  }) => {
    // Step 1: Create an instance of the ContactPage class
    const contactPage = new ContactPage(page);

    // Step 2: Verify that the "Contact Us" header is visible
    await contactPage.verifyContactHeader();

    // Step 3: Fill in the "Ask Us Anything" form
    const firstName = "John";
    const lastName = "Doe";
    const email = "john.doe@example.com";
    const phone = "+1234567890";
    const whereDidYouHear = "Partner"; // Adjust depending on dropdown options

    await contactPage.personalInfoInput(
      firstName,
      lastName,
      email,
      phone,
      whereDidYouHear
    );

    // Step 4: Verify that filled info is preserved before  click on Submit

    await expect(firstName).not.toBeEmpty;
    await expect(lastName).not.toBeEmpty;
    await expect(email).not.toBeEmpty;
    await expect(phone).not.toBeEmpty;
    await expect(whereDidYouHear).not.toBeEmpty;

    // Step 5: Submit the form
    await contactPage.clickSumbit();

    //Step 6:for NON-Prod ent-t without CAPTCHA: should see "Thank you" text

    const thankYouMessage = page.locator("text=Thank you for contacting us.");
    await expect(thankYouMessage).toBeVisible(); // Assert it's visible
  });
});
