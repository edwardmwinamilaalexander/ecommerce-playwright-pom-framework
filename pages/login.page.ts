import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly toastMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.emailInput = page.getByRole('textbox', { name: 'Email*' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password*' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.toastMessage = page.locator('div[data-title]');
  }

  loggedInUser(email: string): Locator {
    return this.page.getByRole('button', { name: email });
  }

  async goToLogin(): Promise<void> {
    await this.page.goto(`${process.env.BASE_URL}/login`, {
      waitUntil: 'networkidle',
    });
  }

  async login(email: string, password: string): Promise<void> {
    await this.fill(this.emailInput, email);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  async getToastMessage(timeout: number = 10000): Promise<string> {
    await this.toastMessage.waitFor({ state: 'visible', timeout });
    return (await this.toastMessage.textContent())?.trim() ?? '';
  }

  async expectToastContains(
    text: string,
    timeout: number = 10000,
  ): Promise<void> {
    await expect(this.toastMessage).toContainText(text, { timeout });
  }
}
