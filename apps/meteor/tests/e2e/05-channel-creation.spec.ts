import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';

import ChannelCreation from './utils/pageobjects/ChannelCreation';
import { validUserInserted, ROCKET_CAT } from './utils/mocks/userAndPasswordMock';
import { PageLogin } from './page-objects';

test.describe('[Channel]', async () => {
	let channelCreation: ChannelCreation;
	let pageLogin: PageLogin;

	const HELLO = 'Hello';

	test.beforeEach(async ({ page, baseURL }) => {
		const baseUrl = baseURL as string;
		pageLogin = new PageLogin(page);
		channelCreation = new ChannelCreation(page);

		await page.goto(baseUrl);
		await pageLogin.doLogin(validUserInserted);
	});

	test.describe('[Public and private channel creation]', () => {
		let channelName: string;
		test.beforeEach(async () => {
			channelName = faker.animal.type();
		});

		test('expect create privateChannel channel', async () => {
			await channelCreation.createChannel(channelName, true);
		});

		test('expect create public channel', async () => {
			await channelCreation.createChannel(channelName, false);
		});
	});
	test('expect send message to channel created', async () => {
		await channelCreation.sendMessage(ROCKET_CAT, HELLO);
	});
});
