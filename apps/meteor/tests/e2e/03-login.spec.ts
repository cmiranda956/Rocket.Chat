import { test, expect, Page } from '@playwright/test';

import { validUser } from './utils/mocks/userAndPasswordMock';
import { HOME_SELECTOR } from './utils/mocks/waitSelectorsMock';
import { PageLogin } from './page-objects';

test.describe('[Login]', () => {
	let page: Page;
	let pageLogin: PageLogin;

	test.beforeEach(async ({ browser }) => {
		const context = await browser.newContext();

		page = await context.newPage();
		pageLogin = new PageLogin(page);

		await page.goto('/');
	});

	test('expect user write a password incorrectly', async () => {
		const invalidUserPassword = {
			email: validUser.email,
			password: 'any_password1',
		};

		await pageLogin.doLogin(invalidUserPassword);
		await expect(pageLogin.boxToast).toBeVisible();
	});

	test('expect user make login', async () => {
		await pageLogin.doLogin(validUser);
		await page.waitForSelector(HOME_SELECTOR);
	});
});
