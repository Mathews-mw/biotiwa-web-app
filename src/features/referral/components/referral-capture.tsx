'use client';

import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { saveReferralRequest } from '../http-requests/save-referral.request';
import { referralQueryKeys } from '../query-keys/referral-query-keys';

export function ReferralCapture() {
	const queryClient = useQueryClient();

	const handledCodeRef = useRef<string | null>(null);

	useEffect(() => {
		const url = new URL(window.location.href);

		const referralCode = url.searchParams.get('ref')?.trim().toUpperCase();

		console.log('Referral code captured from url: ', referralCode);

		if (!referralCode) {
			return;
		}

		if (!/^[A-Z0-9-]{4,24}$/.test(referralCode)) {
			return;
		}

		if (handledCodeRef.current === referralCode) {
			return;
		}

		handledCodeRef.current = referralCode;

		void saveReferralRequest(referralCode)
			.then((referral) => {
				queryClient.setQueryData(referralQueryKeys.current(), referral);

				url.searchParams.delete('ref');

				window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
			})
			.catch(() => {
				handledCodeRef.current = null;
			});
	}, [queryClient]);

	return null;
}
