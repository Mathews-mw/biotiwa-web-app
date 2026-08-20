import { clientApi } from '@/lib/http/client-api';
import type { ICheckoutSessionStatus } from '../types/checkout.types';

interface IRequest {
	providerSessionId: string;
}

type IResponse = ICheckoutSessionStatus;

export async function getCheckoutSessionStatusRequest({ providerSessionId }: IRequest): Promise<IResponse> {
	const response = await clientApi.get(`checkout/sessions/${providerSessionId}`).json<IResponse>();

	return response;
}
