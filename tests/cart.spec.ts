import { test, expect } from '@playwright/test';
import { login } from './_helpers';

// Req FR-003 — Cart contents
test('TC-FR-003-01 added item appears in cart (standard_user)', async ({ page }) => {
  await login(page, 'standard_user');
  await page.locator("[data-test='add-to-cart-sauce-labs-bike-light']").click();
  await page.locator("[data-test='cart-link']").click();
  await expect(page.locator("[data-test='cart-item-name']")).toContainText('Bike Light');
});
test('TC-FR-003-02 added jacket appears in cart (error_user)', async ({ page }) => {
  await login(page, 'error_user');             // DEF-003: jacket add ignored -> fails
  await page.locator("[data-test='add-to-cart-sauce-labs-fleece-jacket']").click();
  await page.locator("[data-test='cart-link']").click();
  await expect(page.locator("[data-test='cart-item-name']")).toContainText('Fleece Jacket');
});
