import type { ICart } from '../types/cart-api-types';

import { CART_CHANGED_EVENT } from '../constants/cart-events';
import { CART_BROADCAST_CHANNEL, CARTS_STORAGE_KEY } from '../constants/cart-storage';

type StoredCarts = Record<string, ICart>;

export function getStoredCarts(): StoredCarts {
	if (typeof window === 'undefined') {
		return {};
	}

	const rawCarts = window.localStorage.getItem(CARTS_STORAGE_KEY);

	if (!rawCarts) {
		return {};
	}

	try {
		const parsed = JSON.parse(rawCarts);

		if (!parsed || typeof parsed !== 'object') {
			return {};
		}

		return parsed as StoredCarts;
	} catch {
		return {};
	}
}

export function getStoredCart(userId: string) {
	const carts = getStoredCarts();

	return carts[userId] ?? null;
}

export function storeCart(cart: ICart) {
	if (typeof window === 'undefined') {
		return;
	}

	const carts = getStoredCarts();

	window.localStorage.setItem(
		CARTS_STORAGE_KEY,
		JSON.stringify({
			...carts,
			[cart.userId]: cart,
		})
	);

	emitCartChanged();
}

export function clearStoredCart(userId: string) {
	if (typeof window === 'undefined') {
		return;
	}

	const carts = getStoredCarts();

	delete carts[userId];

	window.localStorage.setItem(CARTS_STORAGE_KEY, JSON.stringify(carts));

	emitCartChanged();
}

export function emitCartChanged() {
	if (typeof window === 'undefined') {
		return;
	}

	try {
		const channel = new BroadcastChannel(CART_BROADCAST_CHANNEL);

		channel.postMessage({
			type: 'CART_CHANGED',
			occurredAt: new Date().toISOString(),
		});

		channel.close();
	} catch {
		window.dispatchEvent(new Event(CART_CHANGED_EVENT));
	}
}
