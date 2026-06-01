import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { DestinationsPage } from '../pages/DestinationsPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { testData } from '../fixtures/testData';

test.describe('Agendar un destino de viaje - Escenarios exitosos', () => {
  for (const scenario of testData.successScenarios) {
    test(`Filtrar por precio ${scenario.price} y reservar ${scenario.destination}`, async ({ page }) => {
      const homePage = new HomePage(page);
      const destinationsPage = new DestinationsPage(page);
      const checkoutPage = new CheckoutPage(page);
      
      await homePage.goto();
      
      await homePage.fillTravelDetails(
        testData.commonData.departureDate,
        testData.commonData.returnDate,
        testData.commonData.adults,
        testData.commonData.children
      );

      await homePage.selectDestinationBtn.click();
      await page.waitForTimeout(2000);

      await destinationsPage.filterByPrice(scenario.price);
      await destinationsPage.selectDestinationCard(scenario.destination);

      await checkoutPage.fillBasicInfo(
        testData.commonData.name, 
        testData.commonData.email, 
        testData.commonData.phone
      );
      await checkoutPage.uploadFile(testData.commonData.filePath);
      await checkoutPage.fillSSN(testData.commonData.ssn);
      await checkoutPage.applyPromoCode(testData.commonData.promoCode);
      await checkoutPage.acceptTerms();

      const message = await checkoutPage.getConfirmationMessage(scenario.expectedMessage);
      expect(message).toContain(scenario.expectedMessage);
      console.log(`✅ ${scenario.destination} reservado correctamente`);
    });
  }
});

test.describe('Agendar un destino de viaje - Escenarios con dropdown', () => {
  for (const scenario of testData.dropdownScenarios) {
    test(`Seleccionar destino desde dropdown y reservar ${scenario.destination}`, async ({ page }) => {
      const homePage = new HomePage(page);
      const destinationsPage = new DestinationsPage(page);
      const checkoutPage = new CheckoutPage(page);
      
      await homePage.goto();
      
      await homePage.fillTravelDetails(
        scenario.departureDate,
        scenario.returnDate,
        scenario.adults,
        scenario.children
      );

      await homePage.selectDestinationBtn.click();
      await page.waitForTimeout(2000);

      await destinationsPage.filterByPrice(scenario.price);
      
      await destinationsPage.selectDestinationFromDropdown(scenario.destination);

      await checkoutPage.fillBasicInfo(scenario.name, scenario.email, scenario.phone);
      await checkoutPage.uploadFile(scenario.filePath);
      await checkoutPage.fillSSN(scenario.ssn);
      await checkoutPage.applyPromoCode(scenario.promoCode);
      await checkoutPage.acceptTerms();

      const message = await checkoutPage.getConfirmationMessage(scenario.expectedMessage);
      expect(message).toContain(scenario.expectedMessage);
      console.log(`✅ ${scenario.destination} reservado correctamente desde dropdown`);
    });
  }
});

test.describe('Agendar un destino de viaje - Escenario de error', () => {
  for (const errorCase of testData.errorScenarios) {
    test(`Validar formato incorrecto de teléfono`, async ({ page }) => {
      const homePage = new HomePage(page);
      const destinationsPage = new DestinationsPage(page);
      const checkoutPage = new CheckoutPage(page);
      
      await homePage.goto();
      
      await homePage.fillTravelDetails(
        errorCase.departureDate,
        errorCase.returnDate,
        errorCase.adults,
        errorCase.children
      );

      await homePage.selectDestinationBtn.click();
      await page.waitForTimeout(2000);

      await destinationsPage.filterByPrice(errorCase.price);
      await destinationsPage.selectDestinationCard(errorCase.destination);

      await checkoutPage.fillBasicInfo(errorCase.name, errorCase.email, errorCase.phone);
      await checkoutPage.fillInvalidSSN(errorCase.invalidSSN);
      
      const errorMessage = await checkoutPage.getPhoneErrorMessage();
      expect(errorMessage).toContain(errorCase.expectedError);
      console.log(`✅ Mensaje de error validado: "${errorMessage}"`);
    });
  }
});