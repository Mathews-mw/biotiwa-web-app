import { clientApi } from '@/lib/http/client-api';

import { type SearchParamsOption } from 'ky';
import type { IPagination } from '@/core/types/pagination.types';
import type { ICurrencyCode } from '@/features/commerce/types/commerce-entity-types';
import type { IAffiliateCommissionStatus, IAffiliateSales } from '../types/affiliate.types';

interface IRequest {
	page?: number;
	perPage?: number;
	currency?: ICurrencyCode;
	commissionStatus?: IAffiliateCommissionStatus;
}

type IResponse = {
	pagination: IPagination;
	sales: Array<IAffiliateSales>;
};

export async function getAffiliateSalesRequest({
	page,
	perPage,
	currency,
	commissionStatus,
}: IRequest): Promise<IResponse> {
	const params = {
		page,
		per_page: perPage,
		currency,
		commission_status: commissionStatus,
	};

	const cleanParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null)) as SearchParamsOption;

	const response = await clientApi
		.get('affiliates/me/sales', {
			searchParams: cleanParams,
		})
		.json<IResponse>();

	return response;
}
