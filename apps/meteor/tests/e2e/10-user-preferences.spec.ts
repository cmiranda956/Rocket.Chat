import { test, expect, Page } from '@playwright/test';
import faker from '@faker-js/faker';

import MainContent from './utils/pageobjects/MainContent';
import SideNav from './utils/pageobjects/SideNav';
import FlexTab from './utils/pageobjects/FlexTab';
import PreferencesMainContent from './utils/pageobjects/PreferencesMainContent';
import { adminLogin } from './utils/mocks/userAndPasswordMock';
import { clearMessages } from './utils/helpers/clearMessages';
import { PageLogin } from './page-objects';

test.describe('[User Preferences]', () => {
	test.beforeAll(async () => {
		await clearMessages(['GENERAL']);
	});

	test.describe('default', () => {
		let page: Page;
		let pageLogin: PageLogin;
		let flexTab: FlexTab;
		let mainContent: MainContent;
		let sideNav: SideNav;
		let preferencesMainContent: PreferencesMainContent;

		test.beforeAll(async ({ browser }) => {
			const context = await browser.newContext();

			page = await context.newPage();
			pageLogin = new PageLogin(page);
			sideNav = new SideNav(page);
			mainContent = new MainContent(page);
			preferencesMainContent = new PreferencesMainContent(page);
			flexTab = new FlexTab(page);

			await page.goto('/');
			await pageLogin.doLogin(adminLogin);

			await sideNav.sidebarUserMenu().click();
			await sideNav.account().click();
		});

		test.describe('render:', () => {
			test('expect show the preferences link', async () => {
				await expect(sideNav.preferences()).toBeVisible();
			});

			test('expect show the profile link', async () => {
				await expect(sideNav.profile()).toBeVisible();
			});

			test('expect click on the profile link', async () => {
				await sideNav.profile().click();
			});

			test('expect show the username input', async () => {
				await expect(preferencesMainContent.userNameTextInput()).toBeVisible();
			});

			test('expect show the real name input', async () => {
				await expect(preferencesMainContent.realNameTextInput()).toBeVisible();
			});

			test('expect show the email input', async () => {
				await expect(preferencesMainContent.emailTextInput()).toBeVisible(); // .scrollIntoView()
			});

			test('expect show the password input', async () => {
				await expect(preferencesMainContent.passwordTextInput()).toBeVisible(); // .scrollIntoView()
			});

			test('expect show the submit button', async () => {
				await expect(preferencesMainContent.submitBtn()).toBeVisible();
				await expect(preferencesMainContent.submitBtn()).toBeDisabled();
			});
		});

		test.describe('[User Info Change]', () => {
			const newName = faker.name.findName();
			const newUserName = `${faker.name.lastName()}${faker.name.firstName()}`;

			test('expect click on the profile link', async () => {
				await sideNav.profile().click();
			});

			test('expect change the name field', async () => {
				await preferencesMainContent.changeRealName(newName);
			});

			test('expect change the Username field', async () => {
				await preferencesMainContent.changeUsername(newUserName);
			});

			test('expect save the settings', async () => {
				await preferencesMainContent.saveChanges();
			});

			test('expect close the preferences menu', async () => {
				await sideNav.preferencesClose().click();
				await sideNav.getChannelFromList('general').scrollIntoViewIfNeeded();
				await sideNav.getChannelFromList('general').click();
			});

			test('send message with different user name', async () => {
				await mainContent.sendMessage('HI');
			});

			test('expect be that the name on the last message is the edited one', async () => {
				await expect(mainContent.lastMessageUser()).toContainText(newUserName);
			});

			test('expect be that the user name on the members flex tab is the edited one', async () => {
				await mainContent.lastMessageUser().click();
				await expect(mainContent.userCard()).toBeVisible();
			});

			test('expect that the real name on the members flex tab is the edited one', async () => {
				await mainContent.viewUserProfile().click();
				await expect(flexTab.memberRealName()).toHaveText(newUserName);
			});
		});
	});
});
