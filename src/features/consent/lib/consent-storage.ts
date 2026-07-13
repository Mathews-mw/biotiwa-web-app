import type { IConsentPreferences } from '../types/consent';
import { CONSENT_STORAGE_KEY } from '../constants/consent-storage';

export function getStoredConsentPreferences() {
	if (typeof window === 'undefined') {
		return null;
	}

	const rawPreferences = window.localStorage.getItem(CONSENT_STORAGE_KEY);

	if (!rawPreferences) {
		return null;
	}

	try {
		const preferences = JSON.parse(rawPreferences) as IConsentPreferences;

		if (preferences.version !== 1) {
			return null;
		}

		return preferences;
	} catch {
		return null;
	}
}

export function storeConsentPreferences(preferences: IConsentPreferences) {
	if (typeof window === 'undefined') {
		return;
	}

	window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences));
}

export function clearStoredConsentPreferences() {
	if (typeof window === 'undefined') {
		return;
	}

	window.localStorage.removeItem(CONSENT_STORAGE_KEY);
}

export function createConsentPreferences(input: { analytics: boolean; marketing: boolean }): IConsentPreferences {
	return {
		necessary: true,
		analytics: input.analytics,
		marketing: input.marketing,
		version: 1,
		updatedAt: new Date().toISOString(),
	};
}
