import { MOCK_EVENTS_STORAGE_KEY } from '../constants/tracking-storage';
import type { ITrackedEvent, ITrackEventInput } from '../types/tracking';

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
		// Apenas para conseguir abrir o console e verificar os eventos.
		// Todo: vai ser trocado por uma integração real com o Segment ou outro serviço de tracking.
		const currentEvents = JSON.parse(window.localStorage.getItem(MOCK_EVENTS_STORAGE_KEY) ?? '[]') as ITrackedEvent[];

		window.localStorage.setItem(MOCK_EVENTS_STORAGE_KEY, JSON.stringify([...currentEvents, event]));
	}

	return {
		ok: true,
	};
}
