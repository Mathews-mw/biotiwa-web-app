import type { IMarketCode, IOffer, IOrderBump } from '@/features/commerce/types/commerce';

import { calculateOrderSummary } from '@/features/lib/calculate-order-summary';
import { markets, offers, orderBumps } from '@/features/commerce/data/mock-catalog';

type IGetCheckoutSelectionParams = {
	marketCode: string | null;
	offerId: string | null;
	includeOrderBump: boolean;
};

export function getCheckoutSelection({ marketCode, offerId, includeOrderBump }: IGetCheckoutSelectionParams) {
	const selectedMarketCode: IMarketCode = marketCode === 'US' ? 'US' : 'BR';

	const market = markets.find((item) => item.code === selectedMarketCode);

	if (!market) {
		throw new Error('Market not found.');
	}

	const marketOffers = offers.filter((offer) => offer.market === selectedMarketCode);

	const selectedOffer =
		marketOffers.find((offer) => offer.id === offerId) ??
		marketOffers.find((offer) => offer.isHighlighted) ??
		marketOffers[0];

	if (!selectedOffer) {
		throw new Error('Offer not found.');
	}

	const orderBump = orderBumps.find((item) => item.market === selectedMarketCode) ?? null;

	const selectedOrderBump = includeOrderBump && orderBump ? orderBump : null;

	const summary = calculateOrderSummary({
		market,
		offer: selectedOffer,
		orderBump: selectedOrderBump,
	});

	return {
		market,
		offer: selectedOffer as IOffer,
		orderBump: selectedOrderBump as IOrderBump | null,
		summary,
	};
}
