import { test as setup } from '../fixtures/fixtures';
import dotenv from 'dotenv';

dotenv.config();

setup('authenticate as test user', async ({ loginPage, page }) => {
  const email = process.env.TEST_USER_EMAIL!;
  const password = process.env.TEST_USER_PASSWORD!;
  const testUserAuthFile = '.auth/test-user.json';

  await loginPage.goToLogin();
  await loginPage.login(email, password);

  // Now save the fully authenticated state
  await page.context().storageState({ path: testUserAuthFile });
});
