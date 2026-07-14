'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { authQueryKeys } from '../api/auth-query-keys';
import { STORAGE_EVENT } from '@/core/constants/events';
import { AUTH_SESSION_CHANGED_EVENT } from '../constants/auth-events';
import { AUTH_BROADCAST_CHANNEL_KEY, AUTH_SESSION_STORAGE_KEY } from '../constants/auth-storage';

export function AuthSessionSync() {
	const queryClient = useQueryClient();

	useEffect(() => {
		function syncSession() {
			queryClient.invalidateQueries({
				queryKey: authQueryKeys.session(),
			});
		}

		function handleStorage(event: StorageEvent) {
			if (event.key === AUTH_SESSION_STORAGE_KEY) {
				syncSession();
			}
		}

		window.addEventListener(STORAGE_EVENT, handleStorage);
		window.addEventListener(AUTH_SESSION_CHANGED_EVENT, syncSession);

		let channel: BroadcastChannel | null = null;

		try {
			channel = new BroadcastChannel(AUTH_BROADCAST_CHANNEL_KEY);
			channel.onmessage = syncSession;
		} catch {
			channel = null;
		}

		return () => {
			window.removeEventListener(STORAGE_EVENT, handleStorage);
			window.removeEventListener(AUTH_SESSION_CHANGED_EVENT, syncSession);
			channel?.close();
		};
	}, [queryClient]);

	return null;
}
