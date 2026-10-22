import { clientApi } from '@/lib/http/client-api';
import type { IAffiliatePromotionCodeDetails } from '../types/affiliate.types';

type IResponse = {
	promotion_codes: Array<IAffiliatePromotionCodeDetails>;
};

export async function getAffiliatePromotionCodesRequest(): Promise<IResponse> {
	const response = await clientApi.get('affiliates/me/promotion-codes').json<IResponse>();

	return response;
}
