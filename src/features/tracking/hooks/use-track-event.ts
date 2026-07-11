'use client';

import { useMutation } from '@tanstack/react-query';

import { trackEvent } from '../api/tracking-api';
import type { IFunnelEventType } from '../types/tracking';
import { getOrCreateSessionId } from '../lib/get-or-create-session-id';

type TrackParams = {
	eventType: IFunnelEventType;
	market?: 'BR' | 'US';
	payload?: Record<string, unknown>;
};

export function useTrackEvent() {
	const mutation = useMutation({
		mutationFn: trackEvent,
	});

	function track(params: TrackParams) {
		const sessionId = getOrCreateSessionId();

		if (!sessionId) {
			return;
		}

		mutation.mutate({
			sessionId,
			...params,
		});
	}

	return {
		track,
		isPending: mutation.isPending,
	};
}
