import { clientApi } from '@/lib/http/client-api';
import type { IAffiliatePromotionCode } from '../types/affiliate.types';
import type { IMarketCode } from '@/features/commerce/types/commerce-entity-types';

interface IRequest {
	code: string;
	marketCode: IMarketCode;
	expiresInDays: number;
	maxUsesPerCustomer?: number | null;
}

interface IResponse {
	message: string;
	affiliate_promotion_code: IAffiliatePromotionCode;
}

export async function createOwnAffiliatePromotionCodeRequest(payload: IRequest): Promise<IResponse> {
	const { code, marketCode, expiresInDays, maxUsesPerCustomer } = payload;

	const response = await clientApi
		.post('/affiliates/me/promotion-codes', {
			json: {
				code,
				market_code: marketCode,
				expires_in_days: expiresInDays,
				max_uses_per_customer: maxUsesPerCustomer,
			},
		})
		.json<IResponse>();

	return response;
}
