import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly nameField: Locator;
  readonly emailField: Locator;
  readonly phoneField: Locator;
  readonly fileUpload: Locator;
  readonly promoCodeField: Locator;
  readonly applyButton: Locator;
  readonly termsCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameField = page.locator('//input[@maxlength="30"]');
    this.emailField = page.locator('//input[@type="email"]');
    this.phoneField = page.locator('//input[@type="tel"]');
    this.fileUpload = page.locator('//input[@type="file"]');
    this.promoCodeField = page.locator('//input[@name="promo"]');
    this.applyButton = page.locator('//button[contains(text(),"Apply")]');
    this.termsCheckbox = page.locator('//div[@data-react-toolbox="check"]');
  }

  async fillBasicInfo(name: string, email: string, phone: string) {
    await this.nameField.fill(name);
    await this.emailField.fill(email);
    await this.phoneField.fill(phone);
  }

  async fillSSN(ssn: string) {
    await this.phoneField.click();
    await this.page.waitForTimeout(300);
    await this.page.keyboard.press('Shift+Tab');
    await this.page.waitForTimeout(300);
    await this.page.keyboard.type(ssn);
    console.log(`✅ SSN escrito: ${ssn}`);
    await this.page.waitForTimeout(500);
  }

  async fillInvalidSSN(ssn: string) {
    await this.phoneField.click();
    await this.page.waitForTimeout(300);
    await this.page.keyboard.press('Shift+Tab');
    await this.page.waitForTimeout(300);
    await this.page.keyboard.type(ssn);
    console.log(`✅ SSN inválido escrito: ${ssn}`);
    await this.page.waitForTimeout(500);
  }

  async uploadFile(filePath: string) {
    await this.fileUpload.setInputFiles(filePath);
    await this.page.waitForTimeout(500);
  }

  async applyPromoCode(promoCode: string) {
    await this.promoCodeField.fill(promoCode);
    await this.applyButton.click();
    await this.page.waitForTimeout(3000);
  }

  async acceptTerms() {
    await this.termsCheckbox.click();
    await this.page.waitForTimeout(500);
  }

  async getConfirmationMessage(expectedMessage: string): Promise<string> {
    const message = this.page.getByRole('heading', { name: expectedMessage, level: 1 });
    await message.waitFor({ state: 'visible', timeout: 10000 });
    const text = await message.textContent();
    console.log(`📝 Mensaje encontrado: "${text}"`);
    return text || '';
  }

  async getPhoneErrorMessage(): Promise<string> {
    // Usar el texto directamente (playwright lo busca automáticamente)
    const errorMessage = this.page.locator('text=Enter a valid US phone number');
    await errorMessage.waitFor({ state: 'visible', timeout: 5000 });
    const text = await errorMessage.textContent();
    console.log(`📝 Mensaje de error teléfono: "${text}"`);
    return text || '';
  }

  async getSSNErrorMessage(): Promise<string> {
    const errorMessage = this.page.locator('//span[contains(@class,"theme__error") and contains(text(),"Social Security number")]');
    await errorMessage.waitFor({ state: 'visible', timeout: 5000 });
    const text = await errorMessage.textContent();
    console.log(`📝 Mensaje de error SSN: "${text}"`);
    return text || '';
  }
}