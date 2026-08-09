import { CART_BROADCAST_CHANNEL, CART_CHANGED_EVENT } from '../constants/cart-events';

export type ICartBroadcastEvent =
	| {
			type: 'CART_UPDATED';
			occurredAt: string;
	  }
	| {
			type: 'CART_CLEARED';
			occurredAt: string;
	  };

export function emitCartBroadcastEvent(type: ICartBroadcastEvent['type']) {
	if (typeof window === 'undefined') {
		return;
	}

	const event: ICartBroadcastEvent = {
		type,
		occurredAt: new Date().toISOString(),
	};

	try {
		const channel = new BroadcastChannel(CART_BROADCAST_CHANNEL);

		channel.postMessage(event);
		channel.close();
	} catch {
		window.dispatchEvent(new CustomEvent<ICartBroadcastEvent>(CART_CHANGED_EVENT, { detail: event }));
	}
}
