import { Page, Locator } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async click(locator: Locator): Promise<void> {
    return locator.click();
  }

  async fill(locator: Locator, value: string): Promise<void> {
    return locator.fill(value);
  }

  async text(locator: Locator): Promise<string> {
    return (await locator.textContent())?.trim() ?? '';
  }
}
