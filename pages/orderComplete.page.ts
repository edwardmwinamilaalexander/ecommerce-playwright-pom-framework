import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class OrderCompletePage extends BasePage {
  readonly heading: Locator;
  readonly thankYouHeading: Locator;
  readonly confirmationMessage: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Checkout: Complete!' });
    this.thankYouHeading = page.getByRole('heading', {
      name: 'Thank you for your order!',
    });
    this.confirmationMessage = page.getByText(
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
    );
    this.continueShoppingButton = page.getByRole('button', {
      name: 'Continue Shopping',
    });
  }

  async waitForLoaded(): Promise<void> {
    await expect(this.heading).toBeVisible();
    await expect(this.thankYouHeading).toBeVisible();
    await expect(this.confirmationMessage).toBeVisible();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }
}
