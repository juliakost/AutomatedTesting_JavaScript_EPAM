const { expect } = require("@playwright/test");

class ContactPage {
  // Define locators and the page object
  constructor(page) {
    this.page = page;

    // Locators
    this.contactHeader = page.locator(
      'span.museo-sans-light:has-text("Contact Us")'
    );
    this.firstNameInput = page.getByLabel("First Name");
    this.lastNameInput = page.getByLabel("Last Name");
    this.emailInput = page.getByLabel("Email*");
    this.phoneInput = page.getByLabel("Phone*");
    this.locationInput = page.getByLabel("Location");
    this.aboutEpam = page.getByRole("combobox", {
      name: "How did you hear about EPAM?",
    });
    this.comboboxOptions = page.locator(`li.select2-results__option`);
    this.gdprCheckbox = page.locator('input[type="checkbox"][aria-required="true"]');
    this.submitButton = page.getByRole("button", { name: "Submit" });
  } 
  
  // Check if the Contact Header is visible
  async verifyContactHeader() {
    await expect(this.contactHeader).toBeVisible();
    await expect(this.contactHeader).toHaveText(/Contact/);
  }

  // Fill in "Ask Us Anything' form
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
    console.log("Is gdprCheckbox visible?",await this.gdprCheckbox.isVisible());  // Should be `true` if visible
    console.log(await this.gdprCheckbox.isEnabled());  // Should be `true` if enabled
    await this.gdprCheckbox.check({ force: true });
    await expect(this.gdprCheckbox).toBeChecked();
  }

  // Click on a Sumbit of Ask Us Anything
  async clickSumbit() {
    await this.submitButton.click();
  }
}

module.exports = { ContactPage };
