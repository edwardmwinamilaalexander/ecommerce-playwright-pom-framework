import { test, expect } from './fixtures/fixtures';

test.describe('Cart Page', () => {

  test.beforeEach(async ({ loginPage, productsPage, page }) => {
    await loginPage.goToLogin();
    await loginPage.login(
      process.env.TEST_USER_EMAIL!,
      process.env.TEST_USER_PASSWORD!,
    );
    await page.waitForURL('**/ecommerce', { timeout: 15000 });
    await expect(productsPage.heading).toBeVisible();
  });

  test('should navigate to cart and show total section', async ({
    productsPage,
    cartPage,
  }) => {
    await productsPage.addFirstProductToCart();
    await cartPage.goToCart();
    await expect(cartPage.heading).toBeVisible();
    await cartPage.expectCartContainsTotal();
  });

  test('should add first product to cart', async ({
    productsPage,
    cartPage,
  }) => {
    await productsPage.addFirstProductToCart();
    await cartPage.goToCart();
    await cartPage.expectCartContainsTotal();
  });

  test('should add product to cart by index', async ({
    productsPage,
    cartPage,
  }) => {
    await productsPage.addProductToCartByIndex(1);
    await cartPage.goToCart();
    await cartPage.expectCartContainsTotal();
  });

  test('should remove product from cart', async ({
    productsPage,
    cartPage,
  }) => {
    await productsPage.addFirstProductToCart();
    await cartPage.goToCart();
    await expect(cartPage.removeFromCartTrigger).toBeVisible();
    await cartPage.removeFromCart();
    await expect(cartPage.removeFromCartTrigger).not.toBeVisible();
  });

  test('should increase product quantity', async ({
    productsPage,
    cartPage,
  }) => {
    await productsPage.addFirstProductToCart();
    await cartPage.goToCart();
    const before = await cartPage.getQuantity();
    await cartPage.increaseQuantity();
    const after = await cartPage.getQuantity();
    expect(after).toBe(before + 1);
  });

  test('should decrease product quantity', async ({
    productsPage,
    cartPage,
  }) => {
    await productsPage.addFirstProductToCart();
    await cartPage.goToCart();
    await cartPage.increaseQuantity();
    const before = await cartPage.getQuantity();
    await cartPage.decreaseQuantity();
    const after = await cartPage.getQuantity();
    expect(after).toBe(before - 1);
  });

  test('should open quantity selector and choose a quantity', async ({
    productsPage,
    cartPage,
  }) => {
    await productsPage.addFirstProductToCart();
    await cartPage.goToCart();
    await cartPage.openQuantitySelector(3);
    const quantity = await cartPage.getQuantity();
    expect(quantity).toBe(3);
  });

});