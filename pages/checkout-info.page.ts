import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export interface CheckoutInfoDetails {
  firstName: string;
  lastName: string;
  zipCode: string;
}

export class CheckoutInfoPage extends BasePage {
  readonly heading: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly zipCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', {
      name: 'Checkout: Your Information',
    });
    this.firstNameInput = page.getByPlaceholder('Ex. John');
    this.lastNameInput = page.getByPlaceholder('Ex. Doe');
    this.zipCodeInput = page.locator('input.form-control').nth(2);
   this.continueButton = page.getByText('Continue', { exact: true });

    this.cancelButton = page.getByText('Cancel', { exact: true });
  } // ← this closing brace was missing

  async goToCheckoutInfo(): Promise<void> {
    await this.page.goto('/ecommerce/checkout-info');
    await expect(this.heading).toBeVisible();
  }

  async fillCheckoutInformation(details: CheckoutInfoDetails): Promise<void> {
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.zipCodeInput.fill(details.zipCode);
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async completeCheckoutInfo(details: CheckoutInfoDetails): Promise<void> {
    await this.fillCheckoutInformation(details);
    await this.continue();
  }
}
