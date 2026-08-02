'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import type { IAuthBroadcastEvent } from '../lib/auth-broadcast';

import { authQueryKeys } from '../api/auth-query-keys';
import { AUTH_BROADCAST_CHANNEL, AUTH_SESSION_CHANGED_EVENT } from '../constants/auth-events';

export function AuthSessionSync() {
	const queryClient = useQueryClient();

	useEffect(() => {
		function refreshSession() {
			queryClient.invalidateQueries({
				queryKey: authQueryKeys.session(),
			});
		}

		function clearSessionLocally() {
			queryClient.setQueryData(authQueryKeys.session(), {
				session: null,
			});

			refreshSession();
		}

		function handleBroadcastEvent(event: IAuthBroadcastEvent) {
			if (event.type === 'AUTH_SIGNED_OUT') {
				clearSessionLocally();
				return;
			}

			refreshSession();
		}

		function handleVisibilityChange() {
			if (document.visibilityState === 'visible') {
				refreshSession();
			}
		}

		function handleFocus() {
			refreshSession();
		}

		window.addEventListener('focus', handleFocus);
		document.addEventListener('visibilitychange', handleVisibilityChange);

		let channel: BroadcastChannel | null = null;

		try {
			channel = new BroadcastChannel(AUTH_BROADCAST_CHANNEL);

			channel.onmessage = (event: MessageEvent<IAuthBroadcastEvent>) => {
				handleBroadcastEvent(event.data);
			};
		} catch {
			const customEventHandler = (event: Event) => {
				const customEvent = event as CustomEvent<IAuthBroadcastEvent>;

				handleBroadcastEvent(customEvent.detail);
			};

			window.addEventListener(AUTH_SESSION_CHANGED_EVENT, customEventHandler);

			return () => {
				window.removeEventListener('focus', handleFocus);
				document.removeEventListener('visibilitychange', handleVisibilityChange);
				window.removeEventListener(AUTH_SESSION_CHANGED_EVENT, customEventHandler);
			};
		}

		return () => {
			window.removeEventListener('focus', handleFocus);
			document.removeEventListener('visibilitychange', handleVisibilityChange);
			channel?.close();
		};
	}, [queryClient]);

	return null;
}
