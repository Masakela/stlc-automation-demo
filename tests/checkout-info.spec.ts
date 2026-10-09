import { test, expect } from '@playwright/test';
import { login } from './_helpers';

// Req FR-005 — Checkout information form validation
test('TC-FR-005-01 missing first name shows error', async ({ page }) => {
  await login(page, 'standard_user');
  await page.goto('/checkout-info');
  await page.locator("[data-test='last-name']").fill('Doe');
  await page.locator("[data-test='postal-code']").fill('60601');
  await page.locator("[data-test='continue']").click();
  await expect(page.locator("[data-test='error']")).toContainText('First Name is required');
});
test('TC-FR-005-02 missing last name shows error', async ({ page }) => {
  await login(page, 'standard_user');
  await page.goto('/checkout-info');
  await page.locator("[data-test='first-name']").fill('Jane');
  await page.locator("[data-test='postal-code']").fill('60601');
  await page.locator("[data-test='continue']").click();
  await expect(page.locator("[data-test='error']")).toContainText('Last Name is required');
});
test('TC-FR-005-03 missing postal code shows error', async ({ page }) => {
  await login(page, 'standard_user');            // DEF-006: zip not validated -> no error
  await page.goto('/checkout-info');
  await page.locator("[data-test='first-name']").fill('Jane');
  await page.locator("[data-test='last-name']").fill('Doe');
  await page.locator("[data-test='continue']").click();
  await expect(page.locator("[data-test='error']")).toBeVisible();
});
test('TC-FR-005-04 valid info proceeds to overview', async ({ page }) => {
  await login(page, 'standard_user');
  await page.locator("[data-test='add-to-cart-sauce-labs-bike-light']").click();
  await page.goto('/checkout-info');
  await page.locator("[data-test='first-name']").fill('Jane');
  await page.locator("[data-test='last-name']").fill('Doe');
  await page.locator("[data-test='postal-code']").fill('60601');
  await page.locator("[data-test='continue']").click();
  await expect(page.locator("[data-test='total']")).toBeVisible();
});
