'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import type { ICartBroadcastEvent } from '../lib/cart-broadcast';

import { cartQueryKeys } from '../api/cart-query-keys';
import { CART_BROADCAST_CHANNEL, CART_CHANGED_EVENT } from '../constants/cart-events';

export function CartSessionSync() {
	const queryClient = useQueryClient();

	useEffect(() => {
		function refreshCart() {
			queryClient.invalidateQueries({
				queryKey: cartQueryKeys.active(),
			});
		}

		function handleBroadcastEvent(_event: ICartBroadcastEvent) {
			refreshCart();
		}

		let channel: BroadcastChannel | null = null;

		try {
			channel = new BroadcastChannel(CART_BROADCAST_CHANNEL);

			channel.onmessage = (event: MessageEvent<ICartBroadcastEvent>) => {
				handleBroadcastEvent(event.data);
			};
		} catch {
			const customEventHandler = (event: Event) => {
				const customEvent = event as CustomEvent<ICartBroadcastEvent>;

				handleBroadcastEvent(customEvent.detail);
			};

			window.addEventListener(CART_CHANGED_EVENT, customEventHandler);

			return () => {
				window.removeEventListener(CART_CHANGED_EVENT, customEventHandler);
			};
		}

		return () => {
			channel?.close();
		};
	}, [queryClient]);

	return null;
}
