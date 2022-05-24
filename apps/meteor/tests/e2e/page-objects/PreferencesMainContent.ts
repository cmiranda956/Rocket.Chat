import { expect, Locator } from '@playwright/test';

import { BasePage } from './BasePage';

export class PreferencesMainContent extends BasePage {
	public formTextInput(): Locator {
		return this.page.locator('.rocket-form');
	}

	public realNameTextInput(): Locator {
		return this.page.locator('//label[contains(text(), "Name")]/..//input');
	}

	public userNameTextInput(): Locator {
		return this.page.locator('//label[contains(text(), "Username")]/..//input');
	}

	public emailTextInput(): Locator {
		return this.page.locator('//label[contains(text(), "Email")]/..//input');
	}

	public passwordTextInput(): Locator {
		return this.page.locator('//label[contains(text(), "Password")]/..//input');
	}

	public resendVerificationEmailBtn(): Locator {
		return this.page.locator('#resend-verification-email');
	}

	public avatarFileInput(): Locator {
		return this.page.locator('.avatar-file-input');
	}

	public useUploadedAvatar(): Locator {
		return this.page.locator('.avatar-suggestion-item:nth-of-type(2) .select-service');
	}

	public submitBtn(): Locator {
		return this.page.locator('[data-qa="AccountProfilePageSaveButton"]');
	}

	public async changeUsername(userName: string): Promise<void> {
		await this.userNameTextInput().fill(userName);
	}

	public async changeRealName(realName: string): Promise<void> {
		await this.realNameTextInput().fill(realName);
	}

	public async changeEmail(email: string): Promise<void> {
		await this.emailTextInput().fill(email);
	}

	public async saveChanges(): Promise<void> {
		await expect(this.submitBtn()).toBeEnabled();
		await this.submitBtn().click();
	}

	public async changeAvatarUpload(url: string): Promise<void> {
		await this.avatarFileInput().setInputFiles(url);
		await this.useUploadedAvatar().click();
	}
}
