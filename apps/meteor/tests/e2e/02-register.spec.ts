import { Page, test } from '@playwright/test';

import { registerUser, WRONG_PASSWORD } from './utils/mocks/userAndPasswordMock';
import { PageLogin } from './page-objects';

test.describe('[Register]', () => {
	let page: Page;
	let pageLogin: PageLogin;

	test.beforeEach(async ({ browser }) => {
		const context = await browser.newContext();

		page = await context.newPage();
		pageLogin = new PageLogin(page);

		await page.goto('/');
	});

	test('expect user click in register button without data', async () => {
		await pageLogin.btnRegister.click();
		await pageLogin.btnFormSubmit.click();

		expect(await pageLogin.textErrorName.isVisible()).toBeTruthy();
		expect(await pageLogin.textErrorEmail.isVisible()).toBeTruthy();
		expect(await pageLogin.textErrorPassword.isVisible()).toBeTruthy();
	});

	test('expect user click in register button with different password', async () => {
		await pageLogin.btnRegister.click();
		await pageLogin.doRegister({ ...registerUser, passwordConfirm: WRONG_PASSWORD }, false);

		expect(await pageLogin.textErrorPasswordConfirm.textContent()).toBe('The password confirmation does not match password');
	});

	test('expect new user is created', async () => {
		await pageLogin.btnRegister.click();
		await pageLogin.doRegister(registerUser);
	});
});
