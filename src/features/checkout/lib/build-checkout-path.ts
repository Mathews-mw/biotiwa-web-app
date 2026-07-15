import type { IMarketCode } from '@/features/commerce/types/commerce';

type BuildCheckoutPathParams = {
	market: IMarketCode;
	offerId: string;
	includeOrderBump: boolean;
};

export function buildCheckoutPath({ market, offerId, includeOrderBump }: BuildCheckoutPathParams) {
	const searchParams = new URLSearchParams({
		market,
		offer: offerId,
		bump: includeOrderBump ? '1' : '0',
	});

	return `/checkout?${searchParams.toString()}`;
}
