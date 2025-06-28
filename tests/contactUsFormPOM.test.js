const { test, expect } = require("@playwright/test");
const { ContactPage } = require("../pages/contactUsPage.js");

test.describe('Contact Page "Ask Us Anything" form fill in Tests', () => {
  test.use({ storageState: "state.json" });

  test("Should be possible to submit a Ask Us Anything form", async ({
    page,
  }) => {
    const contactPage = new ContactPage(page);
    await contactPage.goto();
    await contactPage.verifyContactHeader();

    const firstName = "John";
    const lastName = "Doe";
    const email = "john.doe@example.com";
    const phone = "+1234567890";
    const whereDidYouHear = "Partner";

    await contactPage.personalInfoInput(
      firstName,
      lastName,
      email,
      phone,
      whereDidYouHear
    );

    await expect(firstName).not.toBeEmpty;
    await expect(lastName).not.toBeEmpty;
    await expect(email).not.toBeEmpty;
    await expect(phone).not.toBeEmpty;
    await expect(whereDidYouHear).not.toBeEmpty;

    await contactPage.clickSumbit();

    /*for NON-Prod ent-t without CAPTCHA: should see "Thank you" text
    const thankYouMessage = page.locator("text=Thank you for contacting us.");
    await expect(thankYouMessage).toBeVisible();*/
  });

  test("check available optoions of 'Reason for Your Inquiry' drop-down", async ({
    page,
  }) => {
    const contactPage = new ContactPage(page);
    await contactPage.goto();
    await contactPage.verifyContactHeader();
    await contactPage.clickSelectReason();
    // Collect dropdown options
    const dropdownOptions = await contactPage.getReasonOptions();

    // Assert that dropdown options match expected values
    expect(dropdownOptions).toEqual([
      "General Information Request",
      "Talk to Sales in North America",
      "Talk to Sales in Continental Europe",
      "Talk to Sales in the UK",
      "Talk to Sales in Northern Europe",
      "Talk to Sales in APAC",
      "Talk to the Consulting Team",
      "Press Inquiry",
      "Careers",
      "Employment Verification",
      "Partner Relations",
      "Investor Relations",
      "Analyst Relations",
      "Website Feedback",
    ]);
  });

  test("Select specific dropdown option", async ({ page }) => {
    const contactPage = new ContactPage(page);
    await contactPage.goto();

    // Select "Talk to Sales in North America" from the dropdown
    await contactPage.clickSpecificReason("Talk to Sales in North America");
  });
});