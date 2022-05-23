import { Locator, Page } from '@playwright/test';

export abstract class BasePage {
	protected readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	get boxToast(): Locator {
		return this.page.locator('.toast');
	}

	get boxToastSuccess(): Locator {
		return this.page.locator('.toast-message');
	}

	public async keyPress(key: string): Promise<void> {
		await this.page.keyboard.press(key);
	}
}
