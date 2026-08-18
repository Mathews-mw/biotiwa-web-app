import { useQuery } from '@tanstack/react-query';

import { commerceQueryKeys } from '../query-keys/commerce-query-keys';
import { getPublicOffersRequest } from '../http-requests/get-public-offers.request';

import type { IGetOffersParams } from '../api/commerce-api-types';

export function useGetPublicOffersQuery(params: IGetOffersParams) {
	return useQuery({
		queryKey: commerceQueryKeys.offers(params),
		queryFn: () => getPublicOffersRequest(params),
		staleTime: 1000 * 60 * 5,
	});
}
