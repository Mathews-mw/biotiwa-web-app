import { clientApi } from '@/lib/http/client-api';

import type { IShippingQuoteDetails } from '../types/shipping-types';

interface IRequest {
	postalCode: string;
}

type IResponse = IShippingQuoteDetails;

export async function createShippingQuoteRequest(input: IRequest): Promise<IResponse> {
	const response = await clientApi
		.post('/shipping/quotes', {
			json: {
				postal_code: input.postalCode,
			},
		})
		.json<IResponse>();

	return response;
}
