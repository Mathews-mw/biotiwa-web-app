import { useMutation, useQuery } from '@tanstack/react-query';

import { checkoutQueryKeys } from '../query-keys/checkout-query-keys';
import { createCheckoutQuoteRequest } from '../http-requests/create-checkout-quote.request';
import { createCheckoutSessionRequest } from '../http-requests/create-checkout-session.request';

export function useCheckoutQuoteQuery(options?: { enabled?: boolean }) {
	return useQuery({
		queryKey: checkoutQueryKeys.quote(),
		queryFn: createCheckoutQuoteRequest,
		enabled: options?.enabled ?? true,
		staleTime: 1000 * 15,
		retry: false,
	});
}

export function useCreateCheckoutSessionMutation() {
	return useMutation({
		mutationFn: createCheckoutSessionRequest,
	});
}
