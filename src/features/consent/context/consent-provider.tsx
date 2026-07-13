'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import type { IConsentContextValue, IConsentPreferences } from '../types/consent';

import {
	clearStoredConsentPreferences,
	createConsentPreferences,
	getStoredConsentPreferences,
	storeConsentPreferences,
} from '../lib/consent-storage';

import { AnalyticsScripts } from '../components/analytics-scripts';
import { CookieConsentBanner } from '../components/cookie-consent-banner';

const ConsentContext = createContext<IConsentContextValue | null>(null);

type ConsentProviderProps = {
	children: ReactNode;
};

export function ConsentProvider({ children }: ConsentProviderProps) {
	const [preferences, setPreferences] = useState<IConsentPreferences | null>(() => getStoredConsentPreferences());

	const hasAnswered = preferences !== null;

	function persistPreferences(nextPreferences: IConsentPreferences) {
		setPreferences(nextPreferences);
		storeConsentPreferences(nextPreferences);
	}

	function acceptAll() {
		persistPreferences(
			createConsentPreferences({
				analytics: true,
				marketing: true,
			})
		);
	}

	function rejectOptional() {
		persistPreferences(
			createConsentPreferences({
				analytics: false,
				marketing: false,
			})
		);
	}

	function savePreferences(input: { analytics: boolean; marketing: boolean }) {
		persistPreferences(createConsentPreferences(input));
	}

	function resetConsent() {
		clearStoredConsentPreferences();
		setPreferences(null);
	}

	const value = useMemo<IConsentContextValue>(() => {
		return {
			preferences,
			hasAnswered,
			acceptAll,
			rejectOptional,
			savePreferences,
			resetConsent,
		};
	}, [preferences, hasAnswered]);

	return (
		<ConsentContext.Provider value={value}>
			{children}

			<AnalyticsScripts preferences={preferences} />
			<CookieConsentBanner />
		</ConsentContext.Provider>
	);
}

export function useConsent() {
	const context = useContext(ConsentContext);

	if (!context) {
		throw new Error('useConsent must be used inside ConsentProvider.');
	}

	return context;
}
