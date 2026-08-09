import { clientApi } from '@/lib/http/client-api';

import type { ICartDetails, ICartSummary } from '../types/cart-entities.types';

export interface IResponse {
	cart: ICartDetails;
	summary: ICartSummary;
}

export async function getActiveCartRequest(): Promise<IResponse> {
	const response = await clientApi.get('/cart/active').json<IResponse>();

	return response;
}
