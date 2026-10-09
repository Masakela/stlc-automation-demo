import { test, expect } from '@playwright/test';
import { login } from './_helpers';

// Req FR-001 — Authentication
test('TC-FR-001-01 valid login lands on inventory', async ({ page }) => {
  await login(page, 'standard_user');
  await expect(page.locator("[data-test='inventory-container']")).toBeVisible();
});
test('TC-FR-001-02 invalid password shows error', async ({ page }) => {
  await login(page, 'standard_user', 'nope');
  await expect(page.locator("[data-test='error']")).toContainText('do not match');
});
test('TC-FR-001-03 locked-out user is blocked', async ({ page }) => {
  await login(page, 'locked_out_user');
  await expect(page.locator("[data-test='error']")).toContainText('locked out');
});
test('TC-FR-001-04 unknown user shows error', async ({ page }) => {
  await login(page, 'ghost_user');
  await expect(page.locator("[data-test='error']")).toBeVisible();
});
