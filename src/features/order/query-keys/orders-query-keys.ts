export const ordersQueryKeys = {
	all: ['orders'] as const,
	userHistory: (...args: unknown[]) => [...ordersQueryKeys.all, 'user-history', ...args] as const,
	details: (orderId: string) => [...ordersQueryKeys.all, orderId] as const,
};
