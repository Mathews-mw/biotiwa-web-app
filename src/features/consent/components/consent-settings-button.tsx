'use client';

import { useConsent } from '../context/consent-provider';

export function ConsentSettingsButton() {
	const { resetConsent } = useConsent();

	return (
		<button type="button" onClick={resetConsent} className="text-white/35 transition-colors hover:text-white">
			Preferências de privacidade
		</button>
	);
}
