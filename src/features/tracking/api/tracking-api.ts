import { BIOTIWA_MOCK_EVENTS_KEY } from '../lib/get-or-create-session-id';
import type { ITrackEventInput } from '../types/tracking';

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function trackEvent(input: ITrackEventInput) {
	await sleep(120);

	const event = {
		...input,
		occurredAt: new Date().toISOString(),
	};

	console.log('Mock funnel event', event);

	if (typeof window !== 'undefined') {
		const currentEvents = JSON.parse(window.localStorage.getItem(BIOTIWA_MOCK_EVENTS_KEY) ?? '[]') as unknown[];

		window.localStorage.setItem(BIOTIWA_MOCK_EVENTS_KEY, JSON.stringify([...currentEvents, event]));
	}

	return {
		ok: true,
	};
}
