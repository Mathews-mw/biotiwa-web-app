import { IReferral } from '../types/referral.types';

export async function saveReferralRequest(code: string): Promise<IReferral> {
	const response = await fetch('/api/referral', {
		method: 'POST',

		headers: {
			'Content-Type': 'application/json',
		},

		body: JSON.stringify({
			code,
		}),
	});

	if (!response.ok) {
		throw new Error('Failed to save referral');
	}

	return response.json();
}
