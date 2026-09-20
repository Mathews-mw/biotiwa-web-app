export const shippingQueryKeys = {
	all: ['shipping'] as const,
	quote: () => [...shippingQueryKeys.all, 'quote'] as const,
};
