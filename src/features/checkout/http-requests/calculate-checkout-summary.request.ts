import { clientApi } from '@/lib/http/client-api';

import type { ICheckoutSummary } from '../types/checkout.types';

interface IRequest {
	shippingRateId?: string | null;
}

type IResponse = ICheckoutSummary;

export async function calculateCheckoutSummaryRequest({ shippingRateId }: IRequest): Promise<IResponse> {
	const response = await clientApi
		.post('/checkout/summary', {
			json: {
				shipping_rate_id: shippingRateId,
			},
		})
		.json<IResponse>();

	return response;
}
