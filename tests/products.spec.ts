import { test, expect } from './fixtures/fixtures';
import { selectDropDown } from '../data/test-data';

test.describe('Products Page', () => {
  test.beforeEach(async ({ loginPage, productsPage, page }) => {
    await loginPage.goToLogin();
    await loginPage.login(
      process.env.TEST_USER_EMAIL!,
      process.env.TEST_USER_PASSWORD!,
    );
    await page.waitForURL('**/ecommerce', { timeout: 15000 });
    await expect(productsPage.heading).toBeVisible();
  });

  test('should display products page heading', async ({ productsPage }) => {
    await expect(productsPage.heading).toHaveText('Products');
  });

  test('should sort products by price low to high', async ({
    productsPage,
  }) => {
    await productsPage.sortBy(selectDropDown.PriceLowHigh);
    const titles = await productsPage.getAllProductTitles();
    expect(titles.length).toBeGreaterThan(0);
  });

  test('should add first product to cart', async ({ productsPage }) => {
    const initialCount = await productsPage.getCartCount();
    await productsPage.addFirstProductToCart();
    const updatedCount = await productsPage.getCartCount();
    expect(updatedCount).toBe(initialCount + 1);
  });

  test('should add multiple products to cart', async ({ productsPage }) => {
    const initialCount = await productsPage.getCartCount();
    await productsPage.addProductToCartByIndex(0);
    await productsPage.addProductToCartByIndex(1);
    const updatedCount = await productsPage.getCartCount();
    expect(updatedCount).toBe(initialCount + 2);
  });

  test('should display product cards', async ({ productsPage }) => {
    await expect(productsPage.productCard.first()).toBeVisible();
    const count = await productsPage.productCard.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should remove product from cart', async ({ productsPage }) => {
    await productsPage.addFirstProductToCart();
    const initialCount = await productsPage.getCartCount();
    await productsPage.removeProductFromCart();
    const updatedCount = await productsPage.getCartCount();
    expect(updatedCount).toBe(initialCount - 1);
  });
});
