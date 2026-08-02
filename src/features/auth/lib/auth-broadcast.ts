import { AUTH_BROADCAST_CHANNEL, AUTH_SESSION_CHANGED_EVENT } from '../constants/auth-events';

export type IAuthBroadcastEvent =
	| {
			type: 'AUTH_SIGNED_IN';
			occurredAt: string;
	  }
	| {
			type: 'AUTH_SIGNED_OUT';
			occurredAt: string;
	  }
	| {
			type: 'AUTH_SESSION_REFRESHED';
			occurredAt: string;
	  };

export function emitAuthBroadcastEvent(type: IAuthBroadcastEvent['type']) {
	if (typeof window === 'undefined') {
		return;
	}

	const event: IAuthBroadcastEvent = {
		type,
		occurredAt: new Date().toISOString(),
	};

	try {
		const channel = new BroadcastChannel(AUTH_BROADCAST_CHANNEL);

		channel.postMessage(event);
		channel.close();
	} catch {
		window.dispatchEvent(
			new CustomEvent<IAuthBroadcastEvent>(AUTH_SESSION_CHANGED_EVENT, {
				detail: event,
			})
		);
	}
}
