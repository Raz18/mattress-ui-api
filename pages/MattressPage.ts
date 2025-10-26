import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { logger } from '../utils/logger';

export class MattressPage extends BasePage {
  private readonly addToCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.addToCartButton = page.getByTestId('addtocart_btn');
  }

  async verifyOnMattressPage(): Promise<boolean> {
    logger.step('Verifying on mattress page');
    try {
      await this.page.waitForURL(/.*\/mattress.*/);
      const isOnMattressPage = this.page.url().includes('/mattress');
      logger.info(`Is on mattress page: ${isOnMattressPage}`);
      return isOnMattressPage;
    } catch (error) {
      logger.error('Failed to verify mattress page', error as Error);
      return false;
    }
  }

  async addToCart(): Promise<void> {
    logger.step('Adding mattress to cart');
    await this.addToCartButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.addToCartButton.click();
    await this.page.waitForURL('**/checkout/cart', { timeout: 30000 });
    logger.info('Mattress added to cart and navigated to cart page');
  }
}
