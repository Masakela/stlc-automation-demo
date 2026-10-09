import { test, expect } from '@playwright/test';
import { login } from './_helpers';

// Req FR-006 — Remove from cart
test('TC-FR-006-01 removing one item leaves the other (standard_user)', async ({ page }) => {
  await login(page, 'standard_user');
  await page.locator("[data-test='add-to-cart-sauce-labs-backpack']").click();
  await page.locator("[data-test='add-to-cart-sauce-labs-bike-light']").click();
  await page.locator("[data-test='cart-link']").click();
  await page.locator("[data-test='remove-sauce-labs-backpack']").click();
  await expect(page.locator("[data-test='cart-item']")).toHaveCount(1);
});
test('TC-FR-006-02 removing the last item empties the cart (standard_user)', async ({ page }) => {
  await login(page, 'standard_user');
  await page.locator("[data-test='add-to-cart-sauce-labs-onesie']").click();
  await page.locator("[data-test='cart-link']").click();
  await page.locator("[data-test='remove-sauce-labs-onesie']").click();
  await expect(page.locator("[data-test='cart-empty']")).toBeVisible();
});
test('TC-FR-006-03 removing the last item empties the cart (problem_user)', async ({ page }) => {
  await login(page, 'problem_user');              // DEF-007: remove ignored -> cart not empty
  await page.locator("[data-test='add-to-cart-sauce-labs-onesie']").click();
  await page.locator("[data-test='cart-link']").click();
  await page.locator("[data-test='remove-sauce-labs-onesie']").click();
  await expect(page.locator("[data-test='cart-empty']")).toBeVisible();
});
