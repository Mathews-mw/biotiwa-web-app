import { clientApi } from '@/lib/http/client-api';

interface IRequest {
	cartItemId: string;
}

export async function removeCartItemRequest({ cartItemId }: IRequest): Promise<void> {
	await clientApi.delete(`/cart/item/${cartItemId}/remove`);
}
