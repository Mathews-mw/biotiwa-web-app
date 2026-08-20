import { calculateOrderSummary } from '../lib/calculate-order-summary';
import { getPublicOffersRequest } from '../http-requests/get-public-offers.request';

import type { ICheckoutQuoteInput, ICheckoutQuoteResponse } from './commerce-api-types';

export async function getCheckoutQuote(input: ICheckoutQuoteInput): Promise<ICheckoutQuoteResponse> {
	const publicOffers = await getPublicOffersRequest({
		market: input.market,
	});

	const offer = publicOffers.offers.find((item) => {
		return item.id === input.offerId || item.slug === input.offerId;
	});

	if (!offer) {
		throw new Error('Selected offer was not found.');
	}

	const orderBump = input.includeOrderBump && publicOffers.order_bump ? publicOffers.order_bump : null;

	const summary = calculateOrderSummary({
		market: publicOffers.market,
		offer,
		orderBump,
	});

	return {
		market: publicOffers.market,
		product: publicOffers.product,
		offer,
		orderBump,
		summary,
	};
}
