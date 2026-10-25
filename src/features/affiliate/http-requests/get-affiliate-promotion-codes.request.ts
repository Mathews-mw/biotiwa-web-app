import { SearchParamsOption } from 'ky';

import type { IAffiliatePromotionCodeDetails } from '../types/affiliate.types';
import type { IPromotionRedemptionStatus } from '@/features/promotion/types/promotion.types';

import { clientApi } from '@/lib/http/client-api';

interface IRequest {
	redemptionStatus?: IPromotionRedemptionStatus;
}

type IResponse = {
	promotion_codes: Array<IAffiliatePromotionCodeDetails>;
};

export async function getAffiliatePromotionCodesRequest({ redemptionStatus }: IRequest): Promise<IResponse> {
	const params = {
		redemption_status: redemptionStatus,
	};

	const cleanParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null)) as SearchParamsOption;

	const response = await clientApi
		.get('affiliates/me/promotion-codes', {
			searchParams: cleanParams,
		})
		.json<IResponse>();

	return response;
}
