import { clientApi } from '@/lib/http/client-api';

interface IRequest {
	cartItemId: string;
	quantity: number;
}

interface IResponse {
	message: string;
}

export async function updateCartItemQuantityRequest({ cartItemId, quantity }: IRequest): Promise<IResponse> {
	const response = await clientApi
		.patch(`/cart/item/${cartItemId}/quantity`, {
			json: {
				quantity,
			},
		})
		.json<IResponse>();

	return response;
}
