import { SearchParamsOption } from 'ky';

import { clientApi } from '@/lib/http/client-api';
import type { IMarket, IMarketCode, IOffer, IOrderBump, IProduct } from '../types/commerce-entity-types';

interface IRequest {
	market?: IMarketCode;
}

export interface IResponse {
	market: IMarket;
	product: IProduct;
	offers: IOffer[];
	order_bump: IOrderBump | null;
}

export async function getPublicOffersRequest({ market }: IRequest): Promise<IResponse> {
	const params = {
		market,
	};

	const cleanParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null)) as SearchParamsOption;

	const response = await clientApi
		.get('/commerce/offers', {
			searchParams: cleanParams,
		})
		.json<IResponse>();

	return response;
}
