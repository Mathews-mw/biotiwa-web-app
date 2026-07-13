export interface IConsentPreferences {
	necessary: true;
	analytics: boolean;
	marketing: boolean;
	version: 1;
	updatedAt: string;
}

export interface IConsentContextValue {
	preferences: IConsentPreferences | null;
	hasAnswered: boolean;
	acceptAll: () => void;
	rejectOptional: () => void;
	savePreferences: (preferences: { analytics: boolean; marketing: boolean }) => void;
	resetConsent: () => void;
}
