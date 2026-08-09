import type { IMarketCode } from '@/features/commerce/types/commerce-entity-types';

type BuildCheckoutStartPathParams = {
	marketCode: IMarketCode;
	offerId: string;
	orderBumpId?: string | null;
};

export function buildCheckoutStartPath({ marketCode, offerId, orderBumpId }: BuildCheckoutStartPathParams) {
	const searchParams = new URLSearchParams({
		market: marketCode,
		offer_id: offerId,
	});

	if (orderBumpId) {
		searchParams.set('order_bump_id', orderBumpId);
	}

	return `/checkout/start?${searchParams.toString()}`;
}
