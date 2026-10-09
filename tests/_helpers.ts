import { Page, expect } from '@playwright/test';
export async function login(page: Page, user: string, password = 'secret_sauce') {
  await page.goto('/login');
  await page.locator("[data-test='username']").fill(user);
  await page.locator("[data-test='password']").fill(password);
  await page.locator("[data-test='login-button']").click();
}
export const priceToNum = (s: string) => Number(s.replace(/[^0-9.]/g, ''));
