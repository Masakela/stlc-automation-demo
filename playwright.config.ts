import { defineConfig, devices } from '@playwright/test';
const BASE = process.env.APP_BASE_URL || 'http://localhost:7070';
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 0,
  reporter: [['list'], ['json', { outputFile: 'test-results/results.json' }], ['html', { open: 'never' }]],
  use: { baseURL: BASE, trace: 'retain-on-failure', screenshot: 'only-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: { command: 'node sut/server.js', url: 'http://localhost:7070/health', reuseExistingServer: true, timeout: 20000 },
});
