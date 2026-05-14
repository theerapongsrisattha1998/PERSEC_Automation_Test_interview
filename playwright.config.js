import { defineConfig, devices } from '@playwright/test';

module.exports = defineConfig({
  timeout: 60000,
  testDir: './tests',
  fullyParallel: process.env.CI ? false : true,
  workers: 1,       
  reporter: 'html',
  use: {
    headless: process.env.CI ? true : false,
    screenshot: 'on',
    video: 'on',
    trace: 'on',
  },
  projects: process.env.CI 
    ? [
        {
          name: 'chromium',
          use: { ...devices['Desktop Chrome'] }, 
        }
      ]
    : [
        {
          name: 'chromium',
          use: { ...devices['Desktop Chrome'] }, 
        },
        {
          name: 'firefox',
          use: { ...devices['Desktop Firefox'] }, 
        },
        {
          name: 'webkit',
          use: { ...devices['Desktop Safari'] }, 
        },
      ],
});
