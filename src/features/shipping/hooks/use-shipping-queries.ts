import { useMutation } from '@tanstack/react-query';

import { createShippingQuoteRequest } from '../http-requests/create-shipping-quote-request';

export function useCreateShippingQuoteMutation() {
	return useMutation({
		mutationFn: createShippingQuoteRequest,
	});
}
