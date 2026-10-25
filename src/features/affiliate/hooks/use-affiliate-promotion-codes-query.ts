import { useQuery } from '@tanstack/react-query';

import type { IPromotionRedemptionStatus } from '@/features/promotion/types/promotion.types';

import { affiliateQueryKeys } from '../queries/affiliate-query-keys';
import { getAffiliatePromotionCodesRequest } from '../http-requests/get-affiliate-promotion-codes.request';

export function useAffiliatePromotionCodesQuery({
	redemptionStatus,
}: {
	redemptionStatus?: IPromotionRedemptionStatus;
}) {
	return useQuery({
		queryKey: affiliateQueryKeys.promotionCodes(redemptionStatus),
		queryFn: () => getAffiliatePromotionCodesRequest({ redemptionStatus }),
		staleTime: 1000 * 60,
	});
}
