import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { affiliateQueryKeys } from '../queries/affiliate-query-keys';
import { getAffiliateSalesRequest } from '../http-requests/get-affiliate-sales.request';

export function useAffiliateSalesQuery({ page, perPage }: { page: number; perPage: number }) {
	return useQuery({
		queryKey: affiliateQueryKeys.sales({
			page,
			perPage,
		}),
		queryFn: () =>
			getAffiliateSalesRequest({
				page,
				perPage,
			}),
		placeholderData: keepPreviousData,
	});
}
