import { clientApi } from '@/lib/http/client-api';

import { type SearchParamsOption } from 'ky';
import type { IPagination } from '@/core/types/pagination.types';
import type { IAffiliateDetails, IAffiliateStatus } from '../types/affiliate.types';

interface IRequest {
	page?: number;
	perPage?: number;
	search?: string;
	status?: IAffiliateStatus;
}

type IResponse = {
	pagination: IPagination;
	affiliates: Array<IAffiliateDetails>;
};

export async function listingAffiliatesRequest({ page, perPage, search, status }: IRequest): Promise<IResponse> {
	const params = {
		page,
		per_page: perPage,
		search,
		status,
	};

	const cleanParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null)) as SearchParamsOption;

	const response = await clientApi
		.get('affiliates/listing', {
			searchParams: cleanParams,
		})
		.json<IResponse>();

	return response;
}
