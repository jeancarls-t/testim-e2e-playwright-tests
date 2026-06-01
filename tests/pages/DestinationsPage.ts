import { Page, Locator } from '@playwright/test';

export class DestinationsPage {
  readonly page: Page;
  readonly priceFilterInput: Locator;
  readonly confirmPriceField: Locator;

  constructor(page: Page) {
    this.page = page;
    this.priceFilterInput = page.locator('//input[@value="1800"]');
    this.confirmPriceField = page.locator('//input[@value="$100"]');
  }

  async filterByPrice(price: number) {
    await this.priceFilterInput.fill(price.toString());
    await this.confirmPriceField.click();
    await this.page.waitForTimeout(2000);
  }

  async selectDestinationCard(destinationName: string) {
    await this.page.locator(`//h5[text()="${destinationName}"]/ancestor::div[contains(@class,"card")]//button[text()="Book"]`).click();
    await this.page.waitForTimeout(2000);
  }

  async selectDestinationFromDropdown(destinationName: string) {
    await this.page.locator('//input[@value="Launch"]').click();
    await this.page.waitForTimeout(500);
    
    await this.page.locator(`//li[text()="${destinationName}"]`).click();
    await this.page.waitForTimeout(1000);
    
    await this.page.locator(`//h5[text()="${destinationName}"]/ancestor::div[contains(@class,"card")]//button[text()="Book"]`).click();
    await this.page.waitForTimeout(2000);
  }
}