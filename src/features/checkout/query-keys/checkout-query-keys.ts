export const checkoutQueryKeys = {
	all: ['checkout'] as const,
	quote: () => [...checkoutQueryKeys.all, 'quote'] as const,
};
