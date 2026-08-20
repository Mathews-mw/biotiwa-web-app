export const checkoutQueryKeys = {
	all: ['checkout'] as const,
	quote: () => [...checkoutQueryKeys.all, 'quote'] as const,
	session: (providerSessionId: string) => [...checkoutQueryKeys.all, 'session', 'status', providerSessionId] as const,
};
