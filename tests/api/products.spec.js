import { test, expect } from '@playwright/test';

const baseURL = 'https://shop-easy-demo.karthikaseva.workers.dev';

test.describe('ShopEasy Products API', () => {

  test('API-001 - Get all products', async ({ request }) => {
    const response = await request.get(`${baseURL}/api/products`);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.success).toBe(true);
    expect(body.count).toBe(8);
    expect(body.products).toHaveLength(8);
  });

  test('API-002 - Get valid product', async ({ request }) => {
    const response = await request.get(`${baseURL}/api/products/1`);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.success).toBe(true);
    expect(body.product.id).toBe(1);
    expect(body.product.name).toBe('Smartphone Pro');
    expect(body.product.price).toBe(49999);
  });

  test('API-003 - Get invalid product', async ({ request }) => {
    const response = await request.get(`${baseURL}/api/products/999`);

    expect(response.status()).toBe(404);

    const body = await response.json();

    expect(body.success).toBe(false);
    expect(body.message).toBe('Product not found');
  });

  test('API-004 - Validate product response fields', async ({ request }) => {
    const response = await request.get(`${baseURL}/api/products/1`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    const product = body.product;

    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('category');
    expect(product).toHaveProperty('rating');
  });

});