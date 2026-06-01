import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly departureDate: Locator;
  readonly returnDate: Locator;
  readonly adultsInput: Locator;
  readonly childrenInput: Locator;
  readonly selectDestinationBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.departureDate = page.locator('(//input[contains(@class,"WhiteDatePicker")])[1]');
    this.returnDate = page.locator('(//input[contains(@class,"WhiteDatePicker")])[2]');
    this.adultsInput = page.locator('//input[@value="Adults (18+)"]');
    this.childrenInput = page.locator('//input[@value="Children (0-7)"]');
    this.selectDestinationBtn = page.locator('//button[contains(text(),"Select Destination")]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async selectDate(calendar: Locator, date: string) {
    const [year, month, day] = date.split('-');
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'];
    const targetMonth = monthNames[parseInt(month) - 1];
    const targetDay = parseInt(day);
    
    await calendar.click();
    await this.page.waitForTimeout(500);
    await this.page.waitForSelector('//div[contains(@class,"calendar")]', { timeout: 5000 });
    
    let currentHeader = '';
    let maxAttempts = 12;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      const headerElement = this.page.locator('//span[contains(@class,"theme__title")]');
      currentHeader = (await headerElement.textContent()) || '';
      
      if (currentHeader.includes(`${targetMonth} ${year}`)) break;
      
      await this.page.locator('button:has-text("chevron_right")').click();
      await this.page.waitForTimeout(500);
      attempts++;
    }
    
    await this.page.locator(`//*[text()="${targetDay}"]`).click();
    await this.page.waitForTimeout(300);
    await this.page.locator('//button[text()="Ok"]').click();
    await this.page.waitForTimeout(500);
  }

  async selectAdults(value: number) {
    await this.adultsInput.click();
    await this.page.waitForTimeout(500);
    await this.page.locator(`//li[text()="${value}"]`).first().click();
    await this.page.waitForTimeout(300);
  }

  async selectChildren(value: number) {
    await this.childrenInput.click();
    await this.page.waitForTimeout(800);
    
    const option = this.page.locator(`li:visible:has-text("${value}")`).first();
    
    if (await option.isVisible()) {
      await option.click();
    } else {
      await this.page.evaluate((val) => {
        const options = document.querySelectorAll('li');
        for (const option of options) {
          if (option.textContent?.trim() === val.toString()) {
            (option as HTMLElement).click();
            break;
          }
        }
      }, value);
    }
    
    await this.page.waitForTimeout(500);
  }

  async fillTravelDetails(departure: string, returnDate: string, adults: number, children: number) {
    await this.selectDate(this.departureDate, departure);
    await this.selectDate(this.returnDate, returnDate);
    await this.selectAdults(adults);
    await this.selectChildren(children);
  }
}