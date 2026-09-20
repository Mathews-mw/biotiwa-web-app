import { SearchParamsOption } from 'ky';

import type { IOrderDetails } from '../types/order.types';
import type { IPagination } from '@/core/actions/pagination.types';

import { clientApi } from '@/lib/http/client-api';

interface IRequest {
	page?: number;
	perPage?: string | number;
	search?: string;
}

interface IResponse {
	pagination: IPagination;
	orders: Array<IOrderDetails>;
}

export async function listingUserOrdersRequest({ page, perPage, search }: IRequest): Promise<IResponse> {
	const params = {
		page,
		per_page: perPage,
		search,
	};

	const cleanParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null)) as SearchParamsOption;

	const response = await clientApi
		.get('orders/user/order-history', {
			searchParams: cleanParams,
		})
		.json<IResponse>();

	return response;
}
