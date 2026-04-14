import { test as setup } from '../fixtures/fixtures';
import dotenv from 'dotenv';

dotenv.config();

setup('authenticate as practice user', async ({ loginPage, page }) => {
  const email = process.env.PRACTICE_USER_EMAIL!;
  const password = process.env.PRACTICE_USER_PASSWORD!;
  const practiceUserAuthFile = '.auth/practice-user.json';

  await loginPage.goToLogin();
  await loginPage.login(email, password);

  // Now save the fully authenticated state
  await page.context().storageState({ path: practiceUserAuthFile });
});