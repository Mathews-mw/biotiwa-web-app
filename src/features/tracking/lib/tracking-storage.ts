import { MOCK_EVENTS_STORAGE_KEY, SESSION_STORAGE_KEY } from '../constants/tracking-storage';
import type { ITrackedEvent } from '../types/tracking';

export function getStoredSessionId() {
	if (typeof window === 'undefined') {
		return null;
	}

	return window.localStorage.getItem(SESSION_STORAGE_KEY);
}

export function getStoredTrackingEvents(): ITrackedEvent[] {
	if (typeof window === 'undefined') {
		return [];
	}

	const rawEvents = window.localStorage.getItem(MOCK_EVENTS_STORAGE_KEY);

	if (!rawEvents) {
		return [];
	}

	try {
		const parsedEvents = JSON.parse(rawEvents);

		if (!Array.isArray(parsedEvents)) {
			return [];
		}

		return parsedEvents as ITrackedEvent[];
	} catch {
		return [];
	}
}

export function clearStoredTrackingEvents() {
	if (typeof window === 'undefined') {
		return;
	}

	window.localStorage.removeItem(MOCK_EVENTS_STORAGE_KEY);
}

export function clearStoredSessionId() {
	if (typeof window === 'undefined') {
		return;
	}

	window.localStorage.removeItem(SESSION_STORAGE_KEY);
}

export function clearAllTrackingStorage() {
	clearStoredTrackingEvents();
	clearStoredSessionId();
}
