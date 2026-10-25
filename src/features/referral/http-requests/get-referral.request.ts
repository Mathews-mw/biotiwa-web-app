import { IReferral } from '../types/referral.types';

export async function getReferralRequest(): Promise<IReferral> {
	const response = await fetch('/api/referral');

	if (!response.ok) {
		throw new Error('Failed to get referral');
	}

	return response.json();
}
