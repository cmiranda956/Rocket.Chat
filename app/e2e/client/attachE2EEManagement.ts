import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { onClientBeforeSendMessage } from '../../../client/lib/onClientBeforeSendMessage';
import { onClientMessageReceived } from '../../../client/lib/onClientMessageReceived';
import { isLayoutEmbedded } from '../../../client/lib/utils/isLayoutEmbedded';
import { settings } from '../../settings/client';
import { e2e } from './rocketchat.e2e';

const isEnabled = (): boolean => {
	if (!Meteor.userId()) {
		return false;
	}

	const adminEmbedded = isLayoutEmbedded() && FlowRouter.current().path.startsWith('/admin');

	if (adminEmbedded) {
		return false;
	}

	return settings.get('E2E_Enable');
};

export const attachE2EEManagement = (): (() => void) | undefined => {
	if (!window.crypto) {
		return undefined;
	}

	const flagWatcher = Tracker.autorun(() => {
		e2e.toggle(isEnabled());
	});

	let detachKeyRequestHandler: (() => void) | undefined;
	let detachSubscriptionWatcher: (() => void) | undefined;
	let detachMessageReceivedTransform: (() => void) | undefined;
	let detachSendingMessageTransform: (() => void) | undefined;
	let detachLogoutHandler: (() => void) | undefined;

	const attachLogoutHandler = (): (() => void) => {
		const computation = Accounts.onLogout(() => {
			e2e.stopClient();
		}) as unknown as {
			stop(): void;
			callback: () => void;
		}; // return type is wrong at declaration files

		return (): void => {
			computation.stop();
		};
	};

	const attacher = Tracker.autorun(() => {
		if (!e2e.isReady()) {
			detachKeyRequestHandler?.();
			detachSubscriptionWatcher?.();
			detachMessageReceivedTransform?.();
			detachSendingMessageTransform?.();
      detachLogoutHandler?.();
      return;
		}

		detachKeyRequestHandler = e2e.watchKeyRequests();
		detachSubscriptionWatcher = e2e.watchSubscriptions();
		detachMessageReceivedTransform = onClientMessageReceived.use((msg) => e2e.transformReceivedMessage(msg));
		detachSendingMessageTransform = onClientBeforeSendMessage.use((msg) =>
			e2e.transformSendingMessage(msg),
		);
		detachLogoutHandler = attachLogoutHandler();
	});

	return (): void => {
		attacher.stop();
		flagWatcher.stop();
		e2e.toggle(false);
	};
};