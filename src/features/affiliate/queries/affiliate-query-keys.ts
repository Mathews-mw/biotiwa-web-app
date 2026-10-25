import type { IMarketCode } from '@/features/commerce/types/commerce-entity-types';

export const affiliateQueryKeys = {
	all: ['affiliate'] as const,
	listing: (...args: unknown[]) => [...affiliateQueryKeys.all, ...args] as const,
	dashboard: () => [...affiliateQueryKeys.all, 'dashboard'] as const,
	sales: (...args: unknown[]) => [...affiliateQueryKeys.all, 'sales', ...args] as const,
	promotionCodes: (...args: unknown[]) => [...affiliateQueryKeys.all, 'promotion-codes', ...args] as const,
	promotionCodeSettings: (marketCode?: IMarketCode) =>
		[...affiliateQueryKeys.all, 'promotion-code-settings', marketCode] as const,
};
