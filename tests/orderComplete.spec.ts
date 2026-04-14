import { test, expect } from './fixtures/fixtures';
import { checkoutInfoDetails } from '../data/test-data';

test.describe('Order Complete Page', () => {
  test.beforeEach(async ({
    loginPage,
    productsPage,
    cartPage,
    page,
  }) => {
    await loginPage.goToLogin();
    await loginPage.login(
      process.env.TEST_USER_EMAIL!,
      process.env.TEST_USER_PASSWORD!,
    );

    await page.waitForURL('**/ecommerce', { timeout: 15000 });
    await expect(productsPage.heading).toBeVisible();

    await productsPage.addFirstProductToCart();
    await cartPage.goToCart();
  });

  test('should load order complete page', async ({
    checkoutInfoPage,
    checkoutOverviewPage,
    orderCompletePage,
  }) => {
    await checkoutInfoPage.goToCheckoutInfo();
    await checkoutInfoPage.completeCheckoutInfo(checkoutInfoDetails);

    await checkoutOverviewPage.finish();

    await orderCompletePage.waitForLoaded();
  });

  test('should display correct headings and confirmation message', async ({
    checkoutInfoPage,
    checkoutOverviewPage,
    orderCompletePage,
  }) => {
    await checkoutInfoPage.goToCheckoutInfo();
    await checkoutInfoPage.completeCheckoutInfo(checkoutInfoDetails);

    await checkoutOverviewPage.finish();

    await expect(orderCompletePage.heading).toBeVisible();
    await expect(orderCompletePage.thankYouHeading).toBeVisible();
    await expect(orderCompletePage.confirmationMessage).toBeVisible();
  });

  test('should continue shopping and return to products page', async ({
    checkoutInfoPage,
    checkoutOverviewPage,
    orderCompletePage,
    productsPage,
    page,
  }) => {
    await checkoutInfoPage.goToCheckoutInfo();
    await checkoutInfoPage.completeCheckoutInfo(checkoutInfoDetails);

    await checkoutOverviewPage.finish();

    await orderCompletePage.waitForLoaded();
    await orderCompletePage.continueShopping();

    await expect(page).toHaveURL(/.*ecommerce/);
    await expect(productsPage.heading).toBeVisible();
  });
});
