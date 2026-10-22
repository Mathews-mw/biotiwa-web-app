export const affiliateQueryKeys = {
	all: ['affiliate'] as const,
	dashboard: () => [...affiliateQueryKeys.all, 'dashboard'] as const,
	sales: (...args: unknown[]) => [...affiliateQueryKeys.all, 'sales', ...args] as const,
	promotionCodes: () => [...affiliateQueryKeys.all, 'promotion-codes'] as const,
};
