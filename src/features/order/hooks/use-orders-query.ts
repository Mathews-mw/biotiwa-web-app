import { useQuery } from '@tanstack/react-query';

import { ordersQueryKeys } from '../query-keys/orders-query-keys';
import { getOrderDetailsRequest } from '../http-requests/get-order-details.request';
import { listingUserOrdersRequest } from '../http-requests/listing-user-orders.request';

interface IUserOrdersParams {
	page?: number;
	perPage?: string | number;
	search?: string;
}

export function useUserOrdersQuery({ options, enabled }: { options?: IUserOrdersParams; enabled?: boolean }) {
	return useQuery({
		queryKey: ordersQueryKeys.userHistory(options),
		queryFn: async () => listingUserOrdersRequest(options ?? {}),
		enabled: enabled ?? true,
	});
}

export function useGetOrderDetails({ orderId, enabled }: { orderId: string; enabled?: boolean }) {
	return useQuery({
		queryKey: ordersQueryKeys.details(orderId),
		queryFn: async () => getOrderDetailsRequest({ orderId }),
		enabled: enabled ?? true,
	});
}
