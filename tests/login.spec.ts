import { test, expect } from './fixtures/fixtures';
import { invalidCredentials } from '../data/test-data';

test.describe('Login', () => {
  test.use({ storageState: undefined });

  test('should login successfully with valid credentials', async ({
    loginPage,
  }) => {
    await loginPage.goToLogin();
    await loginPage.login(   
      process.env.TEST_USER_EMAIL!,
      process.env.TEST_USER_PASSWORD!,
    );
    await expect(loginPage.loggedInUser(process.env.TEST_USER_EMAIL!)).toBeVisible();
  });

  test('should show error message with invalid email', async ({
    loginPage,
  }) => {
    await loginPage.goToLogin();
    await loginPage.login(
      invalidCredentials.invalidEmail.email, process.env.TEST_USER_PASSWORD!,
    );
    await loginPage.expectToastContains( 'Password matched but email is incorrect',
    );
  });

  test('should show error message with invalid password', async ({
    loginPage,
  }) => {
    await loginPage.goToLogin();
    await loginPage.login(
      process.env.TEST_USER_EMAIL!,
      invalidCredentials.invalidPassword.password,
    );
    await loginPage.expectToastContains(
      'Username matched but password is incorrect',
    );
  });

  test('should show error message with both invalid email and password', async ({
    loginPage,
  }) => {
    await loginPage.goToLogin();
    await loginPage.login(
      invalidCredentials.invalidEmail.email,
      invalidCredentials.invalidPassword.password,
    );
    await loginPage.expectToastContains('Neither email nor password matched');
  });
});
