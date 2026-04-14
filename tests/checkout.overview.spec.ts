import { test, expect } from './fixtures/fixtures';
import { checkoutInfoDetails, orderSummary } from '../data/test-data';

test.describe('Checkout Overview Page', () => {
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

  test('should load checkout overview page', async ({
    checkoutInfoPage,
    checkoutOverviewPage,
  }) => {
    await checkoutInfoPage.goToCheckoutInfo();
    await checkoutInfoPage.completeCheckoutInfo(checkoutInfoDetails);

    await expect(checkoutOverviewPage.heading).toBeVisible();
  });

  test('should display correct payment information', async ({
    checkoutInfoPage,
    checkoutOverviewPage,
  }) => {
    await checkoutInfoPage.goToCheckoutInfo();
    await checkoutInfoPage.completeCheckoutInfo(checkoutInfoDetails);

    await checkoutOverviewPage.expectPaymentInfo(
      orderSummary.paymentInformation,
    );
  });

  test('should display correct shipping information', async ({
    checkoutInfoPage,
    checkoutOverviewPage,
  }) => {
    await checkoutInfoPage.goToCheckoutInfo();
    await checkoutInfoPage.completeCheckoutInfo(checkoutInfoDetails);

    await checkoutOverviewPage.expectShippingInfo(
      orderSummary.shippingInformation,
    );
  });

  test('should cancel checkout and return to cart', async ({
    checkoutInfoPage,
    checkoutOverviewPage,
    cartPage,
    page,
  }) => {
    await checkoutInfoPage.goToCheckoutInfo();
    await checkoutInfoPage.completeCheckoutInfo(checkoutInfoDetails);

    await checkoutOverviewPage.cancel();

    await expect(page).toHaveURL(/.*cart/);
    await expect(cartPage.heading).toBeVisible();
  });
});

