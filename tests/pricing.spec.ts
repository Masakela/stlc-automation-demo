import { test, expect } from '@playwright/test';
import { login, priceToNum } from './_helpers';

// Req FR-004 — Pricing & checkout integrity
test('TC-FR-004-01 backpack checkout price matches catalog price', async ({ page }) => {
  await login(page, 'standard_user');
  const catalog = priceToNum(await page.locator("[data-test='inventory-item-price']").first().textContent() || '');
  await page.locator("[data-test='add-to-cart-sauce-labs-backpack']").click();
  await page.locator("[data-test='cart-link']").click();
  const line = priceToNum(await page.locator("[data-test='cart-item-price']").first().textContent() || '');
  expect(line).toBe(catalog);                  // DEF-001: 9.99 != 29.99 -> fails
});
test('TC-FR-004-02 checkout total equals subtotal plus tax (standard_user)', async ({ page }) => {
  await login(page, 'standard_user');
  await page.locator("[data-test='add-to-cart-sauce-labs-bike-light']").click();
  await page.goto('/checkout');
  const sub = priceToNum(await page.locator("[data-test='subtotal']").textContent() || '');
  const tax = priceToNum(await page.locator("[data-test='tax']").textContent() || '');
  const total = priceToNum(await page.locator("[data-test='total']").textContent() || '');
  expect(total).toBeCloseTo(sub + tax, 2);
});
test('TC-FR-004-03 checkout total equals subtotal plus tax (error_user)', async ({ page }) => {
  await login(page, 'error_user');             // DEF-004: phantom $5 -> fails
  await page.locator("[data-test='add-to-cart-sauce-labs-bike-light']").click();
  await page.goto('/checkout');
  const sub = priceToNum(await page.locator("[data-test='subtotal']").textContent() || '');
  const tax = priceToNum(await page.locator("[data-test='tax']").textContent() || '');
  const total = priceToNum(await page.locator("[data-test='total']").textContent() || '');
  expect(total).toBeCloseTo(sub + tax, 2);
});
