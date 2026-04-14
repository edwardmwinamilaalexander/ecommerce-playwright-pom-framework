import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  timeout: 30000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results.json' }],
    ['allure-playwright'],
  ],

  use: {
    browserName: 'chromium',
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    viewport: { width: 1280, height: 720 },
    locale: 'en-GB',
    timezoneId: 'Europe/London',
    baseURL: process.env.BASE_URL || 'https://practice.qabrains.com/ecommerce',
  },

  projects: [
    // 1) SETUP PROJECT — MUST RUN FIRST
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
      use: {
        storageState: undefined,
      },
    },

    // 2) LOGGED-OUT PROJECT
    {
      name: 'logged-out',
      testMatch: ['**/login.spec.ts'],
      use: {
        storageState: undefined,
      },
    },

    // 3) DESKTOP AUTHENTICATED PROJECTS
    {
      name: 'practice-chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/practice-user.json',
      },
      dependencies: ['setup'],
      testIgnore: ['**/login.spec.ts'],
    },
    {
      name: 'test-chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/test-user.json',
      },
      dependencies: ['setup'],
      testIgnore: ['**/login.spec.ts'],
    },
    {
      name: 'student-chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/student-user.json',
      },
      dependencies: ['setup'],
      testIgnore: ['**/login.spec.ts'],
    },

    // 📱 4) MOBILE PROJECTS (NEW)

    {
      name: 'practice-mobile-chrome',
      use: {
        ...devices['Pixel 5'],
        storageState: '.auth/practice-user.json',
      },
      dependencies: ['setup'],
      testIgnore: ['**/login.spec.ts'],
    },
    {
      name: 'test-mobile-safari',
      use: {
        ...devices['iPhone 13'],
        storageState: '.auth/test-user.json',
      },
      dependencies: ['setup'],
      testIgnore: ['**/login.spec.ts'],
    },
    {
      name: 'student-mobile-safari',
      use: {
        ...devices['iPhone 13'],
        storageState: '.auth/student-user.json',
      },
      dependencies: ['setup'],
      testIgnore: ['**/login.spec.ts'],
    },
  ],
});
