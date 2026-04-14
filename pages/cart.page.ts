import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  readonly heading: Locator;
  readonly addToCartButtons: Locator;
  readonly removeFromCartTrigger: Locator;
  readonly removeFromCartConfirm: Locator;
  readonly cartContainer: Locator;
  readonly increaseQuantityButton: Locator;
  readonly decreaseQuantityButton: Locator;
  readonly quantityDisplay: Locator;
  readonly totalText: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', {
      name: 'Your Cart',
      exact: true,
    });

    this.addToCartButtons = page.getByRole('button', { name: 'Add to cart' });
    this.removeFromCartTrigger = page.locator(
      'button[data-slot="dialog-trigger"].text-red-500',
    );
    this.removeFromCartConfirm = page
      .locator('button[data-slot="dialog-close"]')
      .filter({ hasText: 'Remove' });
    this.cartContainer = page.locator('#cart');
    this.increaseQuantityButton = page.getByRole('button', { name: '+' });
    this.decreaseQuantityButton = page.getByRole('button', { name: '-' });
    this.quantityDisplay = page.locator(
      'span.border.rounded.px-3.py-1.text-gray-500',
    );
    this.totalText = page.getByText('Total');
    this.checkoutButton = page.getByText('Checkout', { exact: true });
  }

  async goToCart(): Promise<void> {
    await this.page.goto('/ecommerce/cart');
    await this.heading.waitFor({ state: 'visible' });
  }

  async addFirstProductToCart(): Promise<void> {
    await this.addToCartButtons.first().click();
  }

  async addProductToCartByIndex(index: number): Promise<void> {
    await this.addToCartButtons.nth(index).click();
  }

  async removeFromCart(): Promise<void> {
    await this.removeFromCartTrigger.click();
    await this.removeFromCartConfirm.click();
  }

  async getQuantity(): Promise<number> {
    const text = await this.quantityDisplay.textContent();
    return parseInt(text?.trim() ?? '0');
  }

  async openQuantitySelector(count: number): Promise<void> {
    const current = await this.getQuantity();
    for (let i = current; i < count; i++) {
      await this.increaseQuantityButton.click();
    }
  }

  async increaseQuantity(): Promise<void> {
    await this.increaseQuantityButton.click();
  }

  async decreaseQuantity(): Promise<void> {
    await this.decreaseQuantityButton.click();
  }

  async expectCartContainsTotal(): Promise<void> {
    await expect(this.cartContainer).toContainText('Total');
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
