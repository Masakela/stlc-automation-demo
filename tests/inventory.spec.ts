import { test, expect } from '@playwright/test';
import { login, priceToNum } from './_helpers';

// Req FR-002 — Inventory & cart badge
test('TC-FR-002-01 inventory lists six products', async ({ page }) => {
  await login(page, 'standard_user');
  await expect(page.locator("[data-test='inventory-item']")).toHaveCount(6);
});
test('TC-FR-002-02 adding one item sets badge to 1 (standard_user)', async ({ page }) => {
  await login(page, 'standard_user');
  await page.locator("[data-test='add-to-cart-sauce-labs-backpack']").click();
  await expect(page.locator("[data-test='shopping-cart-badge']")).toHaveText('1');
});
test('TC-FR-002-03 adding one item sets badge to 1 (problem_user)', async ({ page }) => {
  await login(page, 'problem_user');           // DEF-002: badge miscounts -> fails
  await page.locator("[data-test='add-to-cart-sauce-labs-backpack']").click();
  await expect(page.locator("[data-test='shopping-cart-badge']")).toHaveText('1');
});
test('TC-FR-002-04 sort price low-to-high is ascending', async ({ page }) => {
  await login(page, 'standard_user');
  await page.locator("[data-test='sort-lohi']").click();        // DEF-005: reversed -> fails
  const prices = (await page.locator("[data-test='inventory-item-price']").allTextContents()).map(priceToNum);
  const sorted = [...prices].sort((a, b) => a - b);
  expect(prices).toEqual(sorted);
});
