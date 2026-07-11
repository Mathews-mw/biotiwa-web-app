import { SESSION_STORAGE_KEY } from '../constants/tracking-storage';

export function getOrCreateSessionId() {
	if (typeof window === 'undefined') {
		return '';
	}

	const existingSessionId = window.localStorage.getItem(SESSION_STORAGE_KEY);

	if (existingSessionId) {
		return existingSessionId;
	}

	const nextSessionId = crypto.randomUUID();

	window.localStorage.setItem(SESSION_STORAGE_KEY, nextSessionId);

	return nextSessionId;
}
