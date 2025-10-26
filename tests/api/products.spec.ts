import { test, expect } from '@playwright/test';
import { logger } from '../../utils/logger';
import { epic, feature, story, step, attachment } from 'allure-js-commons';

const API_BASE_URL = 'https://qa-api.residenthome.com';

test.describe('Products API Tests', () => {
  
  test('GET /products?brand=awara - Should return products with status 200', async ({ request }) => {
    await epic('API Tests');
    await feature('Products Endpoint');
    await story('Get products by brand');
    
    logger.step('Test: GET /products?brand=awara');
    
    const response = await request.get(`${API_BASE_URL}/products`, {
      params: {
        brand: 'awara'
      }
    });

    // Verify response status is 200
    await step('Verify response status is 200', async () => {
      logger.info(`Response status: ${response.status()}`);
      expect(response.status()).toBe(200);
      logger.info('✓ Status code is 200');
    });

    // Parse response body
    const responseBody = await response.json();
    
    // Attach response to Allure report
    await attachment('API Response', JSON.stringify(responseBody, null, 2), 'application/json');

    // Verify response data length > 0
    await step('Verify response data length > 0', async () => {
      logger.info('Checking response structure');
      
      const data = responseBody.result?.data || responseBody.data || responseBody;
      const dataLength = Array.isArray(data) ? data.length : 0;
      
      logger.info(`Data length: ${dataLength}`);
      expect(dataLength).toBeGreaterThan(0);
      logger.info('✓ Data length is greater than 0');
    });

    logger.info('✅ Test completed successfully');
  });

  test('GET /products?name=the-awara-hybrid-mattress-30&lang=en&brand=awara - Should return exactly 1 product', async ({ request }) => {
    await epic('API Tests');
    await feature('Products Endpoint');
    await story('Get product by name');
    
    logger.step('Test: GET /products with specific name');
    
    const response = await request.get(`${API_BASE_URL}/products`, {
      params: {
        name: 'the-awara-hybrid-mattress-30',
        lang: 'en',
        brand: 'awara'
      }
    });

    // Verify response status is 200
    await step('Verify response status is 200', async () => {
      logger.info(`Response status: ${response.status()}`);
      expect(response.status()).toBe(200);
      logger.info('✓ Status code is 200');
    });

    // Parse response body
    const responseBody = await response.json();
    
    // Attach response to Allure report
    await attachment('API Response', JSON.stringify(responseBody, null, 2), 'application/json');

    // Verify response data length = 1
    await step('Verify response data length equals 1', async () => {
      logger.info('Checking response structure');
      
      const data = responseBody.result?.data || responseBody.data || responseBody;
      const dataLength = Array.isArray(data) ? data.length : 0;
      
      logger.info(`Data length: ${dataLength}`);
      expect(dataLength).toBe(1);
      logger.info('✓ Data length equals 1');
      
      const product = Array.isArray(data) ? data[0] : data;
      logger.info(`Product name: ${product?.name || 'N/A'}`);
    });

    logger.info('✅ Test completed successfully');
  });
});
