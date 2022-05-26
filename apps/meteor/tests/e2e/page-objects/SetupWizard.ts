import { expect, Locator } from '@playwright/test';

import { BasePage } from './BasePage';
import { reason, INVALID_EMAIL_WITHOUT_MAIL_PROVIDER } from '../utils/mocks/userAndPasswordMock';
import { IRegister } from '../utils/interfaces/Login';
import { BACKSPACE } from '../utils/mocks/keyboardKeyMock';

export class SetupWizard extends BasePage {
	private get btnNextStep(): Locator {
		return this.page.locator('//button[contains(text(), "Next")]');
	}

	private get inputFullName(): Locator {
		return this.page.locator('[name="fullname"]');
	}

	private get inputUserName(): Locator {
		return this.page.locator('[name="username"]');
	}

	private get inputCompanyEmail(): Locator {
		return this.page.locator('[name="companyEmail"]');
	}

	private get inputPassword(): Locator {
		return this.page.locator('[name="password"]');
	}

	get btnConfirm(): Locator {
		return this.page.locator('//button[contains(text(), "Confirm")]');
	}

	private get inputOrganizationType(): Locator {
		return this.page.locator('[name="organizationType"]');
	}

	private get selectOrganizationType(): Locator {
		return this.page.locator('.rcx-options .rcx-option:first-child');
	}

	private get inputOrganizationName(): Locator {
		return this.page.locator('[name="inputOrganizationName"]');
	}

	private get btnIndustry(): Locator {
		return this.page.locator('[name="organizationIndustry"]');
	}

	private get selectIndustry(): Locator {
		return this.page.locator('.rcx-options .rcx-option:first-child');
	}

	private get organizationSize(): Locator {
		return this.page.locator('[name="organizationSize"]');
	}

	private get selectOrganizationSize(): Locator {
		return this.page.locator('.rcx-options .rcx-option:first-child');
	}

	private get country(): Locator {
		return this.page.locator('[name="country"]');
	}

	private get selectCountry(): Locator {
		return this.page.locator('.rcx-options .rcx-option:first-child');
	}

	get registeredServer(): Locator {
		return this.page.locator('input[name=email]');
	}

	get btnRegister(): Locator {
		return this.page.locator('//button[contains(text(), "Register")]');
	}

	get agreementField(): Locator {
		return this.page.locator('//input[@name="agreement"]/../i[contains(@class, "rcx-check-box")]');
	}

	get standaloneServer(): Locator {
		return this.page.locator('//button[contains(text(), "Continue as standalone")]');
	}

	get standaloneConfirmText(): Locator {
		return this.page.locator('//*[contains(text(), "Standalone Server Confirmation")]');
	}

	private get fullNameInvalidText(): Locator {
		return this.page.locator('//input[@name="fullname"]/../following-sibling::span');
	}

	private get userNameInvalidText(): Locator {
		return this.page.locator('//input[@name="username"]/../following-sibling::span');
	}

	private get companyEmailInvalidText(): Locator {
		return this.page.locator('//input[@name="companyEmail"]/../following-sibling::span');
	}

	private get passwordInvalidText(): Locator {
		return this.page.locator('//input[@name="password"]/../../../span[contains(@class, "rcx-field__error")]');
	}

	private get industryInvalidSelect(): Locator {
		return this.page.locator('//div[@name="organizationIndustry"]/../following-sibling::span');
	}

	private get sizeInvalidSelect(): Locator {
		return this.page.locator('//div[@name="organizationSize"]/../following-sibling::span');
	}

	private get countryInvalidSelect(): Locator {
		return this.page.locator('//div[@name="country"]/../following-sibling::span');
	}

	private get stepThreeInputInvalidMail(): Locator {
		return this.page.locator('//input[@name="email"]/../../span[contains(text(), "This field is required")]');
	}

	async stepTwoSuccess(): Promise<void> {
		await this.inputOrganizationName.type(reason);

		await this.inputOrganizationType.click();
		await this.selectOrganizationType.click();
		await expect(this.page.locator('.rcx-options')).toHaveCount(0);

		await this.btnIndustry.click();
		await this.selectIndustry.click();
		await expect(this.page.locator('.rcx-options')).toHaveCount(0);

		await this.organizationSize.click();
		await this.selectOrganizationSize.click();
		await expect(this.page.locator('.rcx-options')).toHaveCount(0);

		await this.country.click();
		await this.selectCountry.click();

		await this.btnNextStep.click();
	}

	async stepThreeSuccess(): Promise<void> {
		await this.standaloneServer.click();
	}

	async stepOneFailedBlankFields(): Promise<void> {
		await this.btnNextStep.click();

		await expect(this.fullNameInvalidText).toBeVisible();
		await expect(this.userNameInvalidText).toBeVisible();
		await expect(this.companyEmailInvalidText).toBeVisible();
		await expect(this.passwordInvalidText).toBeVisible();
	}

	async stepOneFailedWithInvalidEmail(adminCredentials: IRegister): Promise<void> {
		await this.inputFullName.type(adminCredentials.name);
		await this.inputUserName.type(adminCredentials.name);
		await this.inputCompanyEmail.type(INVALID_EMAIL_WITHOUT_MAIL_PROVIDER);
		await this.inputPassword.type(adminCredentials.password);

		await this.btnNextStep.click();

		await expect(this.inputCompanyEmail).toBeFocused();
	}

	async stepTwoFailedWithBlankFields(): Promise<void> {
		await this.btnNextStep.click();

		await expect(this.inputOrganizationName).toBeVisible();
		await expect(this.industryInvalidSelect).toBeVisible();
		await expect(this.sizeInvalidSelect).toBeVisible();
		await expect(this.countryInvalidSelect).toBeVisible();
	}

	async stepThreeFailedWithInvalidField(): Promise<void> {
		await this.registeredServer.type(INVALID_EMAIL_WITHOUT_MAIL_PROVIDER);
		await this.registeredServer.click({ clickCount: 3 });
		await this.keyPress(BACKSPACE);

		await expect(this.stepThreeInputInvalidMail).toBeVisible();
	}
}
