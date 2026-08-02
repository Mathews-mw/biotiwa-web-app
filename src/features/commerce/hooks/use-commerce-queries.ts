import { useMutation, useQuery } from '@tanstack/react-query';

import { commerceQueryKeys } from '../query-keys/commerce-query-keys';
import { createCheckoutSession, getCheckoutQuote } from '../api/commerce-api';
import { getPublicOffersRequest } from '../http-requests/get-public-offers.request';

import type { ICheckoutQuoteInput, ICreateCheckoutSessionInput, IGetOffersParams } from '../api/commerce-api-types';

export function usePublicOffersQuery(params: IGetOffersParams) {
	return useQuery({
		queryKey: commerceQueryKeys.offers(params),
		queryFn: () => getPublicOffersRequest(params),
		staleTime: 1000 * 60 * 5,
	});
}

export function useCheckoutQuoteQuery(input: ICheckoutQuoteInput | null) {
	return useQuery({
		queryKey: input ? commerceQueryKeys.quote(input) : commerceQueryKeys.quoteEmpty(),
		queryFn: () => {
			if (!input) {
				throw new Error('Quote input is required.');
			}

			return getCheckoutQuote(input);
		},
		enabled: Boolean(input),
		staleTime: 1000 * 30,
	});
}

export function useCreateCheckoutSessionMutation() {
	return useMutation({
		mutationFn: (input: ICreateCheckoutSessionInput) => {
			return createCheckoutSession(input);
		},
	});
}
