import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { IAffiliateStatus } from '../types/affiliate.types';
import { affiliateQueryKeys } from '../queries/affiliate-query-keys';
import { registerAffiliateAction } from '../actions/register-affiliate.actions';
import { listingAffiliatesRequest } from '../http-requests/listing-affiliates.request';

export function useAffiliatesQuery(params: {
	page: number;
	perPage: number;
	search?: string;
	status?: IAffiliateStatus;
}) {
	return useQuery({
		queryKey: affiliateQueryKeys.listing({
			page: params.page,
			perPage: params.perPage,
			search: params.search,
			status: params.status,
		}),
		queryFn: () =>
			listingAffiliatesRequest({
				page: params.page,
				perPage: params.perPage,
				search: params.search,
				status: params.status,
			}),
		placeholderData: keepPreviousData,
	});
}

export function useRegisterAffiliateMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: registerAffiliateAction,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: affiliateQueryKeys.all,
			});
		},
	});
}
