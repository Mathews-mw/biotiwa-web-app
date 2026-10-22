export async function clearReferralRequest() {
	const response = await fetch('/api/referral', {
		method: 'DELETE',
	});

	if (!response.ok) {
		throw new Error('Failed to clear referral');
	}
}
