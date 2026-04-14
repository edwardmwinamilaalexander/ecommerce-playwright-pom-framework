import { test, expect } from './fixtures/fixtures';
import { checkoutInfoDetails } from '../data/test-data';

test.describe('Checkout Info Page', () => {
  test.beforeEach(async ({ loginPage, productsPage, cartPage, page }) => {
    await loginPage.goToLogin();
    await loginPage.login(
      process.env.TEST_USER_EMAIL!,
      process.env.TEST_USER_PASSWORD!,
    );
    await page.waitForURL('**/ecommerce', { timeout: 15000 });
    await expect(productsPage.heading).toBeVisible();
    await productsPage.addFirstProductToCart
    await cartPage.goToCart();
  });

  test('should load checkout info page', async ({ checkoutInfoPage }) => {
    await checkoutInfoPage.goToCheckoutInfo();
  });

  test('should fill checkout info and continue', async ({
    checkoutInfoPage,
    page,
  }) => {
    await checkoutInfoPage.goToCheckoutInfo();
    await checkoutInfoPage.fillCheckoutInformation(checkoutInfoDetails);
    await checkoutInfoPage.continue();

    await expect(page).toHaveURL(/.*checkout-overview/);
  });

  test('should complete checkout info using full flow helper', async ({
    checkoutInfoPage,
    page,
  }) => {
    await checkoutInfoPage.goToCheckoutInfo();
    await checkoutInfoPage.completeCheckoutInfo(checkoutInfoDetails);

    await expect(page).toHaveURL(/.*checkout-overview/);
  });

  test('should cancel checkout info and return to cart', async ({
    checkoutInfoPage,
    page,
  }) => {
    await checkoutInfoPage.goToCheckoutInfo();
    await checkoutInfoPage.cancel();

    await expect(page).toHaveURL(/.*cart/);
  });
});