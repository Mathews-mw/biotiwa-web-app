import { clientApi } from '@/lib/http/client-api';

import { type SearchParamsOption } from 'ky';
import type { IAffiliatePromotionCodeSettings } from '../types/affiliate.types';
import type { IMarketCode } from '@/features/commerce/types/commerce-entity-types';

interface IRequest {
	marketCode?: IMarketCode;
}

type IResponse = IAffiliatePromotionCodeSettings;

export async function getAffiliatePromotionCodeSettingsRequest({ marketCode }: IRequest): Promise<IResponse> {
	const params = {
		market_code: marketCode,
	};

	const cleanParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null)) as SearchParamsOption;

	const response = await clientApi
		.get('affiliates/me/promotion-code-settings', {
			searchParams: cleanParams,
		})
		.json<IResponse>();

	return response;
}
