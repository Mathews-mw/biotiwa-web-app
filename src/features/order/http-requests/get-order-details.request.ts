import { clientApi } from '@/lib/http/client-api';

import type { IOrderDetails } from '../types/order.types';
import type { IPayment } from '@/features/payment/types/payment.types';

interface IRequest {
	orderId: string;
}

interface IResponse {
	order: IOrderDetails;
	payment: IPayment | null;
}

export async function getOrderDetailsRequest({ orderId }: IRequest): Promise<IResponse> {
	const response = await clientApi.get(`orders/${orderId}/details`).json<IResponse>();

	return response;
}
