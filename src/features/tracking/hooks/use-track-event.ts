'use client';

import { useCallback } from 'react';

import { trackEvent } from '../api/tracking-api';
import type { IFunnelEventType } from '../types/tracking';
import { getOrCreateSessionId } from '../lib/get-or-create-session-id';

type TrackParams = {
	eventType: IFunnelEventType;
	market?: 'BR' | 'US';
	payload?: Record<string, unknown>;
};

export function useTrackEvent() {
	const track = useCallback(async (params: TrackParams) => {
		const sessionId = getOrCreateSessionId();

		if (!sessionId) {
			return;
		}

		try {
			await trackEvent({
				sessionId,
				...params,
			});
		} catch (error) {
			if (process.env.NODE_ENV === 'development') {
				console.error('Failed to track event', error);
			}
		}
	}, []);

	return {
		track,
	};
}
