import { Page, test, expect } from '@playwright/test';

import { adminLogin } from './utils/mocks/userAndPasswordMock';
import { userMock } from './utils/mocks/userMock';
import MainContent from './utils/pageobjects/MainContent';
import SideNav from './utils/pageobjects/SideNav';
import { PageLogin } from './page-objects';

test.describe('[Message Popup]', () => {
	let page: Page;
	let pageLogin: PageLogin;
	let mainContent: MainContent;
	let sideNav: SideNav;

	test.beforeAll(async ({ browser }) => {
		const context = await browser.newContext();

		page = await context.newPage();
		pageLogin = new PageLogin(page);

		mainContent = new MainContent(page);
		sideNav = new SideNav(page);

		await page.goto('/');
		await pageLogin.doLogin(adminLogin);
		await sideNav.openChannel('public channel');
	});

	test.describe('User mentions', () => {
		test('expect show message popup', async () => {
			await mainContent.setTextToInput('@');
			expect(await mainContent.messagePopUp().isVisible()).toBeTruthy();
		});

		test('expect popup title to be people', async () => {
			await mainContent.setTextToInput('@');
			expect(await mainContent.messagePopUpTitle().locator('text=People').isVisible()).toBeTruthy();
		});

		test('expect show "userMock.username" in options', async () => {
			await mainContent.setTextToInput('@');
			expect(await mainContent.messagePopUpItems().locator(`text=${userMock.username}`).isVisible()).toBeTruthy();
		});

		test('expect show "all" option', async () => {
			await mainContent.setTextToInput('@');
			expect(await mainContent.messagePopUpItems().locator('text=all').isVisible()).toBeTruthy();
		});

		test('expect show "here" option', async () => {
			await mainContent.setTextToInput('@');
			expect(await mainContent.messagePopUpItems().locator('text=here').isVisible()).toBeTruthy();
		});
	});
});
