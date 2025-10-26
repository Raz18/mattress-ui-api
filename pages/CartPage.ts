import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { logger } from '../utils/logger';

export class CartPage extends BasePage {
  private readonly cartTitle: Locator;
  private readonly cartItemCount: Locator;

  constructor(page: Page) {
    super(page);
    this.cartTitle = page.locator('text=/Your Cart/i');
    this.cartItemCount = page.locator('text=/\\(\\d+\\s+Items?\\)/i');
  }

  private getProductTitleLocator(productName: string): Locator {
    return this.page.getByTestId(`cart_product_title_${productName}`);
  }

  async verifyOnCartPage(): Promise<boolean> {
    logger.step('Verifying on cart page');
    try {
      await this.page.waitForURL('**/checkout/cart');
      const isOnCart = this.page.url().includes('/checkout/cart');
      logger.info(`Is on cart page: ${isOnCart}`);
      return isOnCart;
    } catch (error) {
      logger.error('Failed to verify cart page', error as Error);
      return false;
    }
  }

  async getCartTitle(): Promise<string> {
    logger.step('Getting cart title');
    try {
      const titleText = await this.cartTitle.textContent();
      const countText = await this.cartItemCount.textContent();
      const fullTitle = `${titleText || ''} ${countText || ''}`.trim();
      logger.info(`Cart title: ${fullTitle}`);
      return fullTitle;
    } catch (error) {
      logger.error('Failed to get cart title', error as Error);
      return '';
    }
  }

  async verifyCartHasItems(): Promise<boolean> {
    logger.step('Verifying cart has items');
    try {
      const countText = await this.cartItemCount.textContent();
      const hasItems = countText !== null && !countText.includes('(0 Items)');
      logger.info(`Cart has items: ${hasItems}, Count text: ${countText}`);
      return hasItems;
    } catch (error) {
      logger.error('Failed to verify cart items', error as Error);
      return false;
    }
  }

  async verifyProductInCart(productName: string): Promise<boolean> {
    logger.step(`Verifying product in cart: ${productName}`);
    try {
      const productTitleLocator = this.getProductTitleLocator(productName);
      const isVisible = await productTitleLocator.isVisible();
      logger.info(`Product ${productName} found in cart: ${isVisible}`);
      return isVisible;
    } catch (error) {
      logger.error('Failed to verify product in cart', error as Error);
      return false;
    }
  }
}
