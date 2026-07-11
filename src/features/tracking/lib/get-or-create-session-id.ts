export const SESSION_STORAGE_KEY = 'biotiwa_session_id';
export const BIOTIWA_MOCK_EVENTS_KEY = 'biotiwa_mock_events';

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
