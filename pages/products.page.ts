import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductsPage extends BasePage {
  readonly heading: Locator;
  readonly sortDropdown: Locator;
  readonly sortOption: (name: string) => Locator;
  readonly cartBadge: Locator;
  readonly addToCartButtons: Locator;
  readonly productCard: Locator;
  readonly productTitles: Locator;
  readonly removeProductFromCartButton: Locator;

  constructor(page: Page) {
    super(page);

    this.heading = page.getByRole('heading', { name: 'Products' });
    this.sortDropdown = page.getByText('Select...');
    this.sortOption = (name: string) => page.getByRole('option', { name });
    this.cartBadge = page
      .locator('#ecommerce-header .profile > span[role="button"]')
      .first();
    this.addToCartButtons = page.getByRole('button', { name: 'Add to cart' });
    this.productCard = page.locator('div.flex.flex-col.gap-3.relative.group');
    this.productTitles = page.locator('a.text-lg.block.decoration-0');
    this.removeProductFromCartButton = page.getByRole('button', {
      name: 'Remove from cart',
    });
  }

  async goToProducts(): Promise<void> {
    await this.page.goto('/ecommerce');
    await this.heading.waitFor({ state: 'visible' });
  }

  async sortBy(option: string): Promise<void> {
    await this.sortDropdown.click();
    await this.sortOption(option).click();
  }

  async addFirstProductToCart(): Promise<void> {
    await this.addToCartButtons.first().click();
  }

  async addProductToCartByIndex(index: number): Promise<void> {
    await this.addToCartButtons.nth(index).click();
  }

  async removeProductFromCart(): Promise<void> {
    await this.removeProductFromCartButton.first().click();
  }

  async getCartCount(): Promise<number> {
    const text = await this.cartBadge.textContent();
    return Number(text?.trim() ?? 0);
  }

  async getAllProductTitles(): Promise<string[]> {
    return await this.productTitles.allTextContents();
  }
}
