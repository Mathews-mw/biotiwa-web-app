import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';

import { checkoutQueryKeys } from '../query-keys/checkout-query-keys';
import { createCheckoutSessionRequest } from '../http-requests/create-checkout-session.request';
import { calculateCheckoutSummaryRequest } from '../http-requests/calculate-checkout-summary.request';
import { getCheckoutSessionStatusRequest } from '../http-requests/get-checkout-session-status.request';

type UseCheckoutSessionStatusQueryParams = {
	providerSessionId: string | null;
};

const REFETCH_INTERVAL_IN_MS = 2 * 1000; // 2 seconds

export function useCalculateCheckoutSummaryQuery(
	options?: { enabled?: boolean },
	params?: { cartId?: string; shippingRateId?: string }
) {
	return useQuery({
		queryKey: checkoutQueryKeys.summary(params?.cartId, params?.shippingRateId),
		queryFn: async () => calculateCheckoutSummaryRequest({ shippingRateId: params?.shippingRateId }),
		enabled: options?.enabled ?? true,
		placeholderData: keepPreviousData,
		staleTime: 1000 * 15, // 15 seconds
		retry: false,
	});
}

export function useCheckoutSessionStatusQuery({ providerSessionId }: UseCheckoutSessionStatusQueryParams) {
	return useQuery({
		queryKey: checkoutQueryKeys.session(providerSessionId ?? 'empty'),
		queryFn: () => {
			if (!providerSessionId) {
				throw new Error('Provider session id is required.');
			}

			return getCheckoutSessionStatusRequest({ providerSessionId });
		},
		enabled: Boolean(providerSessionId),
		retry: 2,
		refetchInterval: (query) => {
			const checkoutSession = query.state.data;

			if (!checkoutSession) {
				return false;
			}

			return checkoutSession.is_pending ? REFETCH_INTERVAL_IN_MS : false;
		},
	});
}

export function useCreateCheckoutSessionMutation() {
	return useMutation({
		mutationFn: createCheckoutSessionRequest,
	});
}
