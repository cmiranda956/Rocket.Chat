import { test, expect } from '@playwright/test';

import { VALID_EMAIL, INVALID_EMAIL, INVALID_EMAIL_WITHOUT_MAIL_PROVIDER } from './utils/mocks/userAndPasswordMock';
import { PageLogin } from './page-objects';

test.describe('[Forgot Password]', () => {
	let pageLogin: PageLogin;

	test.beforeEach(async ({ page }) => {
		pageLogin = new PageLogin(page);

		await page.goto('/');
		await pageLogin.btnPasswordForgot.click();
	});

	test('expect be required', async () => {
		await pageLogin.btnFormSubmit.click();

		expect(await pageLogin.textErrorEmail.isVisible()).toBeTruthy();
	});

	test('expect invalid for email without domain', async () => {
		await pageLogin.inputEmail.type(INVALID_EMAIL_WITHOUT_MAIL_PROVIDER);
		await pageLogin.btnFormSubmit.click();

		expect(await pageLogin.textErrorEmail.isVisible()).toBeTruthy();
	});

	test('expect be invalid for email with invalid domain', async () => {
		await pageLogin.inputEmail.type(INVALID_EMAIL);
		await pageLogin.btnFormSubmit.click();

		expect(await pageLogin.textErrorEmail.isVisible()).toBeTruthy();
	});

	test('expect user type a valid email', async () => {
		await pageLogin.inputEmail.type(VALID_EMAIL);
		await pageLogin.btnFormSubmit.click();

		expect(await pageLogin.boxToastSuccess.isVisible()).toBeTruthy();
	});
});
