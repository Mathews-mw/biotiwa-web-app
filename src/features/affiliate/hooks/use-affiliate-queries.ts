import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { IAffiliateStatus } from '../types/affiliate.types';
import type { IMarketCode } from '@/features/commerce/types/commerce-entity-types';

import { affiliateQueryKeys } from '../queries/affiliate-query-keys';
import { registerAffiliateAction } from '../actions/register-affiliate.actions';
import { listingAffiliatesRequest } from '../http-requests/listing-affiliates.request';
import { createOwnAffiliatePromotionCodeAction } from '../actions/create-own-affiliate-promotion-code.actions';
import { getAffiliatePromotionCodeSettingsRequest } from '../http-requests/get-affiliate-promotion-code-settings.request';

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

export function useAffiliatePromotionCodeSettingsQuery(marketCode: IMarketCode) {
	return useQuery({
		queryKey: affiliateQueryKeys.promotionCodeSettings(marketCode),
		queryFn: () => getAffiliatePromotionCodeSettingsRequest({ marketCode }),
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

export function useCreateAffiliatePromotionCodeMutation(marketCode: IMarketCode) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createOwnAffiliatePromotionCodeAction,
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: affiliateQueryKeys.promotionCodes(),
				}),
				queryClient.invalidateQueries({
					queryKey: affiliateQueryKeys.dashboard(),
				}),
				queryClient.invalidateQueries({
					queryKey: affiliateQueryKeys.promotionCodeSettings(marketCode),
				}),
			]);
		},
	});
}
