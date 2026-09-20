export const checkoutQueryKeys = {
	all: ['checkout'] as const,
	summary: (...args: unknown[]) => [...checkoutQueryKeys.all, 'summary', ...args] as const,
	session: (providerSessionId: string) => [...checkoutQueryKeys.all, 'session', 'status', providerSessionId] as const,
};
