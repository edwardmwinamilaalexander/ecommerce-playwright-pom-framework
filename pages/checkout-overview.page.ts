import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutOverviewPage extends BasePage {
  readonly heading: Locator;
  readonly summaryContainer: Locator;
  readonly paymentInfo: Locator;
  readonly shippingInfo: Locator;
  readonly itemTotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Checkout: Overview' });
    this.summaryContainer = page.locator('div.summery');
    this.paymentInfo = page
      .locator('#checkout-overview')
      .getByText('SampleCard', { exact: false });
    this.shippingInfo = page
      .locator('#checkout-overview')
      .getByText('Free Express Delivery', { exact: false });
    this.itemTotal = page
      .locator('div.summery')
      .getByText('Item Total', { exact: false });
    this.tax = page.locator('div.summery').getByText('Tax', { exact: false });
    this.total = page
      .locator('div.summery')
      .getByText('Total', { exact: false })
      .last();
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
  }

  async waitForOverview(): Promise<void> {
    await this.heading.waitFor({ state: 'visible' });
  }

  async expectPaymentInfo(text: string): Promise<void> {
    await expect(this.paymentInfo).toContainText(text);
  }

  async expectShippingInfo(text: string): Promise<void> {
    await expect(this.shippingInfo).toContainText(text);
  }

  async expectItemTotal(text: string): Promise<void> {
    await expect(this.itemTotal).toContainText(text);
  }

  async expectTax(text: string): Promise<void> {
    await expect(this.tax).toContainText(text);
  }

  async expectTotal(text: string): Promise<void> {
    await expect(this.total).toContainText(text);
  }

  async finish(): Promise<void> {
    await this.click(this.finishButton);
  }

  async cancel(): Promise<void> {
    await this.click(this.cancelButton);
  }
}
