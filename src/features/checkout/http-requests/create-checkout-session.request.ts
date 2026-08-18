import { clientApi } from '@/lib/http/client-api';
import { ICheckoutSession } from '../types/checkout-types';

export async function createCheckoutSessionRequest(): Promise<ICheckoutSession> {
	const response = await clientApi.post('/checkout/sessions').json<ICheckoutSession>();

	return response;
}
