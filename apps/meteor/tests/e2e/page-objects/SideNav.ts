import { expect, Locator } from '@playwright/test';

import { BasePage } from './BasePage';
import { ENTER } from '../utils/mocks/keyboardKeyMock';

export class SideNav extends BasePage {
	// New channel
	public channelType(): Locator {
		return this.page.locator(
			'//*[@id="modal-root"]//*[contains(@class, "rcx-field") and contains(text(), "Private")]/../following-sibling::label/i',
		);
	}

	public channelReadOnly(): Locator {
		return this.page.locator('.create-channel__switches .rc-switch__button');
	}

	public channelName(): Locator {
		return this.page.locator('#modal-root [placeholder="Channel Name"]');
	}

	public saveChannelBtn(): Locator {
		return this.page.locator('//*[@id="modal-root"]//button[contains(text(), "Create")]');
	}

	// Account box
	public getPopOverContent(): Locator {
		return this.page.locator('.rc-popover__content');
	}

	public accountBoxUserName(): Locator {
		return this.page.locator('.sidebar__account-username');
	}

	public accountBoxUserAvatar(): Locator {
		return this.page.locator('.sidebar__account .avatar-image');
	}

	public accountMenu(): Locator {
		return this.page.locator('.sidebar__account');
	}

	public sidebarHeader(): Locator {
		return this.page.locator('.sidebar__header');
	}

	public sidebarUserMenu(): Locator {
		return this.page.locator('[data-qa="sidebar-avatar-button"]');
	}

	public sidebarMenu(): Locator {
		return this.page.locator('.sidebar__toolbar-button-icon--menu');
	}

	public popOverContent(): Locator {
		return this.page.locator('.rc-popover__content');
	}

	public popOverHideOption(): Locator {
		return this.page.locator('.rcx-option__content:contains("Hide")');
	}

	public statusOnline(): Locator {
		return this.page.locator('(//*[contains(@class, "rcx-box--with-inline-elements") and contains(text(), "online")])[1]');
	}

	public statusAway(): Locator {
		return this.page.locator('//*[contains(@class, "rcx-box--with-inline-elements") and contains(text(), "away")]');
	}

	public statusBusy(): Locator {
		return this.page.locator('//*[contains(@class, "rcx-box--with-inline-elements") and contains(text(), "busy")]');
	}

	public statusOffline(): Locator {
		return this.page.locator('//*[contains(@class, "rcx-box--with-inline-elements") and contains(text(), "offline")]');
	}

	public account(): Locator {
		return this.page.locator('//li[@class="rcx-option"]//div[contains(text(), "My Account")]');
	}

	public admin(): Locator {
		return this.page.locator('//li[@class="rcx-option"]//div[contains(text(), "Administration")]');
	}

	public logout(): Locator {
		return this.page.locator('//*[contains(@class, "rcx-option__content") and contains(text(), "Logout")]');
	}

	public sideNavBar(): Locator {
		return this.page.locator('.sidebar');
	}

	// Toolbar
	public spotlightSearchIcon(): Locator {
		return this.page.locator('[data-qa="sidebar-search"]');
	}

	public spotlightSearch(): Locator {
		return this.page.locator('[data-qa="sidebar-search-input"]');
	}

	public spotlightSearchPopUp(): Locator {
		return this.page.locator('[data-qa="sidebar-search-result"]');
	}

	public newChannelBtnToolbar(): Locator {
		return this.page.locator('[data-qa="sidebar-create"]');
	}

	public newChannelBtn(): Locator {
		return this.page.locator('//*[contains(@class, "rcx-option__content")]', { hasText: 'Channel' });
	}

	public newDiscussionBtn(): Locator {
		return this.page.locator('//*[contains(@class, "rcx-option__content")]', { hasText: 'Discussion' });
	}

	public newChannelIcon(): Locator {
		return this.page.locator('[data-qa="sidebar-create-channel"]');
	}

	// Rooms List
	public general(): Locator {
		return this.getChannelFromList('general');
	}

	public channelLeave(): Locator {
		return this.page.locator('.leave-room');
	}

	public channelHoverIcon(): Locator {
		return this.page.locator('.rooms-list > .wrapper > ul [title="general"] .icon-eye-off');
	}

	// Account
	public preferences(): Locator {
		return this.page.locator('[href="/account/preferences"]');
	}

	public profile(): Locator {
		return this.page.locator('[href="/account/profile"]');
	}

	public avatar(): Locator {
		return this.page.locator('[href="/changeavatar"]');
	}

	public preferencesClose(): Locator {
		return this.page.locator('//*[contains(@class,"flex-nav")]//i[contains(@class, "rcx-icon--name-cross")]');
	}

	public burgerBtn(): Locator {
		return this.page.locator('.burger, [aria-label="Open_menu"]');
	}

	public sidebarWrap(): Locator {
		return this.page.locator('.sidebar-wrap');
	}

	public firstSidebarItem(): Locator {
		return this.page.locator('.sidebar-item');
	}

	public firstSidebarItemMenu(): Locator {
		return this.page.locator('[data-qa=sidebar-avatar-button]');
	}

	public popoverOverlay(): Locator {
		return this.page.locator('.rc-popover.rc-popover--sidebar-item');
	}

	public returnToMenuInLowResolution(): Locator {
		return this.page.locator('//button[@aria-label="Close menu"]');
	}

	// Check if navbar is open
	public async isSideBarOpen(): Promise<boolean> {
		return !!(await this.sideNavBar().getAttribute('style'));
	}

	// Opens a channel via rooms list
	public async openChannel(channelName: any): Promise<void> {
		await this.page.locator('[data-qa="sidebar-item-title"]', { hasText: channelName }).scrollIntoViewIfNeeded();
		await this.page.locator('[data-qa="sidebar-item-title"]', { hasText: channelName }).click();
		await expect(this.page.locator('.rcx-room-header')).toContainText(channelName);
	}

	// Opens a channel via spotlight search
	public async searchChannel(channelName: string): Promise<void> {
		await expect(this.spotlightSearch()).toBeVisible();

		await this.spotlightSearch().click();

		await expect(this.spotlightSearch()).toBeFocused();
		await this.spotlightSearch().type(channelName);

		await expect(this.page.locator('[data-qa="sidebar-item-title"]', { hasText: channelName }).first()).toContainText(channelName);

		await this.spotlightSearchPopUp().click();
	}

	public async searchChannelAndOpen(channelName: string): Promise<void> {
		await this.searchChannel(channelName);
	}

	public getChannelFromList(channelName: any): Locator {
		return this.page.locator('[data-qa="sidebar-item-title"]', { hasText: channelName });
	}

	private searchUser(): Locator {
		return this.page.locator('[data-qa="sidebar-search"]');
	}

	private searchInput(): Locator {
		return this.page.locator('[data-qa="sidebar-search-input"]');
	}

	public async createChannel(channelName: any, isPrivate: any /* isReadOnly*/): Promise<void> {
		await this.newChannelBtnToolbar().click();

		await this.newChannelBtn().click();

		if (!isPrivate) {
			await this.channelType().click();
		}

		await this.channelName().type(channelName);

		await expect(this.saveChannelBtn()).toBeEnabled();

		// if (isReadOnly) {
		// 	this.channelReadOnly.click();
		// }

		await this.saveChannelBtn().click();
		await expect(this.channelType()).not.toBeVisible();
		// mainContent.messageInput().should('be.focused');
	}

	public async findForChat(target: string): Promise<void> {
		await this.searchUser().click();
		await this.searchInput().type(target, { delay: 300 });
		await this.page.keyboard.press(ENTER);
	}

	public async doLogout(): Promise<void> {
		await this.page.goto('/home');
		await this.sidebarUserMenu().click();
		await this.logout().click();
	}
}
