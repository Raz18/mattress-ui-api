import { Page } from '@playwright/test';
import { logger } from '../utils/logger';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string): Promise<void> {
    logger.info(`Navigating to ${url}`);
    await this.page.goto(url);
    logger.info(`Successfully navigated to ${url}`);
  }

  async getTitle(): Promise<string> {
    const title = await this.page.title();
    logger.info(`Page title: ${title}`);
    return title;
  }

  async getCurrentUrl(): Promise<string> {
    const url = this.page.url();
    logger.info(`Current URL: ${url}`);
    return url;
  }

  async waitForTimeout(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }

  async closeModal(): Promise<void> {
    try {
      logger.info('Attempting to close modal if present');
      // Try pressing Escape to close any modal
      await this.page.keyboard.press('Escape');
      await this.waitForTimeout(1000);
      logger.info('Modal closed successfully');
    } catch (error) {
      logger.warn('No modal to close or error closing modal');
    }
  }
}
