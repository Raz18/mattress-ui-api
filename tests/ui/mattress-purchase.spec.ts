import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { MattressPage } from '../../pages/MattressPage';
import { CartPage } from '../../pages/CartPage';
import { logger } from '../../utils/logger';
import { step, attachment, epic, feature } from 'allure-js-commons';

test.describe('Mattress Purchase Flow - UI Tests', () => {
  
  test('Should complete mattress purchase flow with custom User-Agent', async ({ browser }) => {
    await epic('UI Tests');
    await feature('Mattress Purchase Flow');
    
    // Configure browser context with custom User-Agent as required
    const context = await browser.newContext({
      userAgent: 'E2EUI-Tests',
      viewport: { width: 1920, height: 1080 }
    });
    
    const page = await context.newPage();
    
    // Initialize page objects
    const homePage = new HomePage(page);
    const mattressPage = new MattressPage(page);
    const cartPage = new CartPage(page);

    try {
      // Step 1: Open https://qa.awarasleep.com/ and verify page loads
      await step('Open home page and verify it loads', async () => {
        logger.step('Step 1: Opening https://qa.awarasleep.com/');
        await homePage.open();
        
        const isLoaded = await homePage.verifyPageLoaded();
        expect(isLoaded).toBeTruthy();
        logger.info('✓ Home page loaded successfully');
        
        // Attach screenshot to Allure report
        const screenshot = await page.screenshot();
        await attachment('Home Page', screenshot, 'image/png');
      });

      // Step 2: Click "Shop Mattress" button and verify navigation to /mattress
      await step('Click Shop Mattress button and verify navigation', async () => {
        logger.step('Step 2: Clicking Shop Mattress button');
        await homePage.clickShopMattress();
        
        const isOnMattressPage = await mattressPage.verifyOnMattressPage();
        expect(isOnMattressPage).toBeTruthy();
        
        const currentUrl = page.url();
        expect(currentUrl).toContain('/mattress');
        logger.info('✓ Successfully navigated to mattress page');
        
        // Attach screenshot to Allure report
        const screenshot = await page.screenshot();
        await attachment('Mattress Page', screenshot, 'image/png');
      });

      // Step 3: Add mattress to cart and verify automatic navigation to cart page
      await step('Add mattress to cart and verify automatic navigation', async () => {
        logger.step('Step 3: Adding mattress to cart');
        await mattressPage.addToCart();
        
        // Verify we're automatically redirected to cart page
        const isOnCartPage = await cartPage.verifyOnCartPage();
        expect(isOnCartPage).toBeTruthy();
        logger.info('✓ Automatically navigated to cart page');
        
        // Attach screenshot to Allure report
        const screenshot = await page.screenshot();
        await attachment('Cart Page After Add', screenshot, 'image/png');
      });

      // Step 4: Verify cart title shows "Your Cart (X Items)"
      await step('Verify cart title and item count', async () => {
        logger.step('Verifying cart title and item count');
        
        const cartTitle = await cartPage.getCartTitle();
        expect(cartTitle).toContain('Your Cart');
        expect(cartTitle).toMatch(/\(\d+\s+Items?\)/); // Matches "(1 Item)" or "(5 Items)"
        logger.info(`✓ Cart title verified: ${cartTitle}`);
        
        const hasItems = await cartPage.verifyCartHasItems();
        expect(hasItems).toBeTruthy();
        logger.info('✓ Cart contains items');
      });

      // Step 5: Verify the product we just added is visible in cart
      await step('Verify mattress product in cart', async () => {
        logger.step('Verifying mattress product is in cart');
        
        const productInCart = await cartPage.verifyProductInCart('Awara Natural Luxury Hybrid Mattress');
        expect(productInCart).toBeTruthy();
        logger.info('✓ Mattress product found in cart');
        
        // Attach final screenshot to Allure report
        const screenshot = await page.screenshot();
        await attachment('Cart with Product', screenshot, 'image/png');
      });

      logger.info('✅ All test steps completed successfully');
      
    } catch (error) {
      logger.error('Test failed', error as Error);
      
      // Attach failure screenshot to Allure report
      const screenshot = await page.screenshot();
      await attachment('Failure Screenshot', screenshot, 'image/png');
      
      throw error;
    } finally {
      await context.close();
    }
  });
});
