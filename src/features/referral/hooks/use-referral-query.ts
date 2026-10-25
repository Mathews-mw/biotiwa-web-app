import { useQuery } from '@tanstack/react-query';

import { referralQueryKeys } from '../query-keys/referral-query-keys';
import { getReferralRequest } from '../http-requests/get-referral.request';

export function useReferralQuery() {
	return useQuery({
		queryKey: referralQueryKeys.current(),
		queryFn: getReferralRequest,
		staleTime: Infinity,
	});
}
