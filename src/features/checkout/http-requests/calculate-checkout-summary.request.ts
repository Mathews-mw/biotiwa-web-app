import { clientApi } from '@/lib/http/client-api';

import type { ICheckoutSummary } from '../types/checkout.types';

interface IRequest {
	shippingRateId?: string | null;
	promotionCode?: string;
}

type IResponse = ICheckoutSummary;

export async function calculateCheckoutSummaryRequest({ shippingRateId, promotionCode }: IRequest): Promise<IResponse> {
	const response = await clientApi
		.post('/checkout/summary', {
			json: {
				shipping_rate_id: shippingRateId || undefined,
				promotion_code: promotionCode || undefined,
			},
		})
		.json<IResponse>();

	return response;
}

export async function applyPromotionCodeRequest({ shippingRateId, promotionCode }: IRequest) {
	console.log('apply promotion request: ', shippingRateId, promotionCode);

	return calculateCheckoutSummaryRequest({
		shippingRateId,
		promotionCode,
	});
}
