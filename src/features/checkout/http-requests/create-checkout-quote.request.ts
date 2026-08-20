import { clientApi } from '@/lib/http/client-api';
import { ICheckoutQuote } from '../types/checkout.types';

interface IResponse {
	quote: ICheckoutQuote;
}

export async function createCheckoutQuoteRequest(): Promise<IResponse> {
	const response = await clientApi.post('/checkout/quote').json<IResponse>();

	return response;
}
