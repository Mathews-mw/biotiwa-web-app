import { useQuery } from '@tanstack/react-query';

import { affiliateQueryKeys } from '../queries/affiliate-query-keys';
import { getAffiliatePromotionCodesRequest } from '../http-requests/get-affiliate-promotion-codes.request';

export function useAffiliatePromotionCodesQuery() {
	return useQuery({
		queryKey: affiliateQueryKeys.promotionCodes(),
		queryFn: getAffiliatePromotionCodesRequest,
		staleTime: 1000 * 60,
	});
}
