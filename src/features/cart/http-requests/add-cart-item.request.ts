import { clientApi } from '@/lib/http/client-api';

import type { IAddCartItemInput } from '../types/cart-api.types';
import type { ICartDetails, ICartSummary } from '../types/cart-entities.types';

interface IResponse {
	message: string;
	cart: ICartDetails;
	summary: ICartSummary;
}

export async function addCartItemRequest(input: IAddCartItemInput): Promise<IResponse> {
	const response = await clientApi
		.post('/cart/item/add', {
			json:
				input.type === 'OFFER'
					? {
							type: 'OFFER',
							market_code: input.marketCode,
							offer_id: input.offerId,
							quantity: input.quantity ?? 1,
						}
					: {
							type: 'ORDER_BUMP',
							market_code: input.marketCode,
							order_bump_id: input.orderBumpId,
							quantity: input.quantity ?? 1,
						},
		})
		.json<IResponse>();

	return response;
}
