const { expect } = require('@playwright/test');

class ContactPage {
  // Define locators and the page object
  constructor(page) {
    this.page = page;

    // Locators
    this.contactHeader = page.locator('span.museo-sans-light:has-text("Contact Us")');
    this.firstNameInput = page.getByLabel('First Name');
    this.lastNameInput = page.getByLabel('Last Name');
    this.emailInput = page.getByLabel('Email*');
    this.phoneInput = page.getByLabel('Phone*');
    this.locationInput = page.getByLabel('Location');
    this.aboutEpam = page.getByRole('combobox', { name: 'How did you hear about EPAM?' });
    this.gdrpCheckbox = page.getByRole('checkbox', { name: 'gdprConsent' });
    this.submitButton = page.getByRole('button', { name: 'Submit' }); 
    this.thankYou = page.locator('span:has-text("Thank you for contacting us.")')
  }

  // **Interface Methods (Actions)**

  // Navigate directly to the Contact Us page
  async navigateTo() {
    await this.page.goto('https://www.epam.com/about/who-we-are/contact');
  }

  // Check if the Contact Header is visible
  async verifyContactHeader() {
    await expect(this.contactHeader).toBeVisible();
    await expect(this.contactHeader).toHaveText(/Contact/); // Validates header text
  }

  // Fill in Ask Us Anything
  async personalInfoInput(firstName, lastName, email, phone, dropdownOption) {
console.log('Is firstNameInput visible?', await this.firstNameInput.isVisible());
console.log('Is lastNameInput visible?', await this.lastNameInput.isVisible());
console.log('Is emailInput visible?', await this.emailInput.isVisible());
console.log('Is phoneInput visible?', await this.phoneInput.isVisible());
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
    await expect(this.locationInput).not.toBeEmpty;
    await this.aboutEpam.click();
    await this.page.locator(`li.select2-results__option:has-text("${dropdownOption}")`).click();
    //await this.gdrpCheckbox.check();
  }

  // Click on a Sumbit of Ask Us Anything
  async clickSumbit() {
    await this.submitButton.click();
    await expect(this.thankYou).toBeVisible();
  }
}

module.exports = { ContactPage };