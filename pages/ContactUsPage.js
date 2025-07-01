const { expect } = require("@playwright/test");

class ContactPage {
  // Define locators and the page object
  constructor(page) {
    this.page = page;

    // Locators
    this.contactHeader = page.locator('span.museo-sans-light:has-text("Contact Us")'); 
    this.inquiryReason = page.getByRole("combobox", {name: "Select the Reason for Your Inquiry*",});
    this.reasonListContainer = page.locator('.os-content').nth(1); 
    this.comboboxReasons = page.locator(`li.select2-results__option`);
    this.firstNameInput = page.getByLabel("First Name");
    this.lastNameInput = page.getByLabel("Last Name");
    this.emailInput = page.getByLabel("Email*");
    this.phoneInput = page.getByLabel("Phone*");
    this.locationInput = page.getByLabel("Location*");
    this.aboutEpam = page.getByRole("combobox", {
      name: "How did you hear about EPAM?",
    });
    this.comboboxOptions = page.locator(`li.select2-results__option`);
    this.gdprCheckbox = page.locator('input[type="checkbox"][aria-required="true"]');
    this.submitButton = page.getByRole("button", { name: "Submit" });
  }
  async goto() {
    await this.page.goto("https://www.epam.com/about/who-we-are/contact");
  }

  // Check if the Contact Header is visible
  async verifyContactHeader() {
    await expect(this.contactHeader).toBeVisible();
    await expect(this.contactHeader).toHaveText(/Contact/);
  }

  // Fill in mandatory within "Ask Us Anything' form
  async personalInfoInput(firstName, lastName, email, phone, dropdownOption) {
    console.log(
      "Is firstNameInput visible?",
      await this.firstNameInput.isVisible()
    );
    console.log(
      "Is lastNameInput visible?",
      await this.lastNameInput.isVisible()
    );
    console.log("Is emailInput visible?", await this.emailInput.isVisible());
    console.log("Is phoneInput visible?", await this.phoneInput.isVisible());
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
    await expect(this.locationInput).not.toBeEmpty;
    await this.aboutEpam.click();
    await this.comboboxOptions.filter({ hasText: dropdownOption }).click();
    console.log(
      "Is gdprCheckbox visible?",
      await this.gdprCheckbox.isVisible()
    );
    console.log("Is gdprCheckbox is ON?", await this.gdprCheckbox.isEnabled());
    await this.gdprCheckbox.check({ force: true });
    await expect(this.gdprCheckbox).toBeChecked();
  }

  async clickSumbit() {
    await this.submitButton.click();
  }

  async clickSelectReason() {
    await this.inquiryReason.click();
     await expect(this.reasonListContainer).toBeVisible(); // Validate dropdown container visibility
    console.log("Dropdown container is visible.");
  }

  async getReasonOptions() {
  const count = await this.comboboxReasons.count(); 
  const options = [];

  for (let i = 0; i < count; i++) {
    const text = await this.comboboxReasons.nth(i).textContent(); 
    options.push(text.trim());
  }

  console.log(options); 
  return options;
}

async clickSpecificReason(reason) {
    await this.inquiryReason.click();

    const dropdownOption = this.page.getByRole('option', { name: reason }); // Match option by name
    await expect(dropdownOption).toBeVisible(); // Ensure visibility
    await dropdownOption.click(); // Click on the dropdown option
    console.log(`Clicked the dropdown option: ${reason}`);
  }
}

module.exports = { ContactPage };
