'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { cartQueryKeys } from '../api/cart-query-keys';
import { CART_CHANGED_EVENT } from '../constants/cart-events';
import { CART_BROADCAST_CHANNEL, CARTS_STORAGE_KEY } from '../constants/cart-storage';

export function CartSessionSync() {
	const queryClient = useQueryClient();

	useEffect(() => {
		function syncCart() {
			queryClient.invalidateQueries({
				queryKey: cartQueryKeys.all,
			});
		}

		function handleStorage(event: StorageEvent) {
			if (event.key === CARTS_STORAGE_KEY) {
				syncCart();
			}
		}

		window.addEventListener('storage', handleStorage);
		window.addEventListener(CART_CHANGED_EVENT, syncCart);

		let channel: BroadcastChannel | null = null;

		try {
			channel = new BroadcastChannel(CART_BROADCAST_CHANNEL);
			channel.onmessage = syncCart;
		} catch {
			channel = null;
		}

		return () => {
			window.removeEventListener('storage', handleStorage);
			window.removeEventListener(CART_CHANGED_EVENT, syncCart);
			channel?.close();
		};
	}, [queryClient]);

	return null;
}
