import { useMutation, useQuery } from '@tanstack/react-query';

import type { ICheckoutQuoteInput, ICreateCheckoutSessionInput, IGetOffersParams } from '../api/commerce-api-types';

import { commerceQueryKeys } from '../api/commerce-query-keys';
import { createCheckoutSession, getCheckoutQuote, getPublicOffers } from '../api/commerce-api';

export function usePublicOffersQuery(params: IGetOffersParams) {
	return useQuery({
		queryKey: commerceQueryKeys.offers(params),
		queryFn: () => getPublicOffers(params),
		staleTime: 1000 * 60 * 5,
	});
}

export function useCheckoutQuoteQuery(input: ICheckoutQuoteInput | null) {
	return useQuery({
		queryKey: input ? commerceQueryKeys.quote(input) : [...commerceQueryKeys.all, 'checkout-quote', 'empty'],
		queryFn: () => {
			if (!input) {
				throw new Error('Dados insuficientes para calcular o pedido.');
			}

			return getCheckoutQuote(input);
		},
		enabled: Boolean(input),
		staleTime: 1000 * 15,
	});
}

export function useCreateCheckoutSessionMutation() {
	return useMutation({
		mutationFn: (input: ICreateCheckoutSessionInput) => {
			return createCheckoutSession(input);
		},
	});
}
