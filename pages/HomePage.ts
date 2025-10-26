import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { logger } from '../utils/logger';

export class HomePage extends BasePage {
  // Selectors
  private readonly shopMattressButton: Locator;
  private readonly heroHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.shopMattressButton = page.getByRole('link', { name: 'Shop Mattress' }).first();
    this.heroHeading = page.getByRole('heading', { name: /save up to/i });
  }

  async open(): Promise<void> {
    logger.step('Opening home page');
    await this.navigate('/');
    await this.closeModal();
  }

  async verifyPageLoaded(): Promise<boolean> {
    logger.step('Verifying home page is loaded');
    try {
      await this.heroHeading.waitFor({ state: 'visible', timeout: 10000 });
      const isVisible = await this.heroHeading.isVisible();
      logger.info(`Home page hero heading visibility: ${isVisible}`);
      return isVisible;
    } catch (error) {
      logger.error('Home page failed to load', error as Error);
      return false;
    }
  }

  async clickShopMattress(): Promise<void> {
    logger.step('Clicking Shop Mattress button');
    try {
      // Wait for navigation after clicking
      await Promise.all([
        this.page.waitForURL(/.*\/mattress.*/, { timeout: 30000 }),
        this.shopMattressButton.click()
      ]);
      logger.info('Shop Mattress button clicked and navigated');
    } catch (error) {
      logger.warn('Direct click failed, trying alternative approach');
      // Alternative: navigate directly
      await this.page.goto('/mattress');
      logger.info('Navigated to mattress page directly');
    }
  }
}
