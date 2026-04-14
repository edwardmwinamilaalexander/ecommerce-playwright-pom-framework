import { test as setup } from '../fixtures/fixtures';
import dotenv from 'dotenv';

dotenv.config();

setup('authenticate as student user', async ({ loginPage, page }) => {
  const email = process.env.STUDENT_USER_EMAIL!;
  const password = process.env.STUDENT_USER_PASSWORD!;
  const studentUserAuthFile = '.auth/student-user.json';

  await loginPage.goToLogin();
  await loginPage.login(email, password);

  // Now save the fully authenticated state
  await page.context().storageState({ path: studentUserAuthFile });
});