import { defineConfig, devices } from '@playwright/test';

/**
 * E2E tests for Al-Hayaat School form flows.
 * Requires the Next.js dev server with a real local PostgreSQL database.
 * Run: npx playwright test --config=playwright-e2e.config.ts
 */
export default defineConfig({
  testDir: './tests/e2e',
  outputDir: './test-results/e2e',
  timeout: 30_000,
  retries: 1,
  reporter: [
    ['html', { outputFolder: 'playwright-report/e2e', open: 'never' }],
    ['list'],
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: true, // always reuse if already running
    timeout: 120_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
