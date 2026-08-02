import { calculateOrderSummary } from '../lib/calculate-order-summary';
import { getPublicOffersRequest } from '../http-requests/get-public-offers.request';

import type {
	ICheckoutQuoteInput,
	ICheckoutQuoteResponse,
	ICreateCheckoutSessionInput,
	ICreateCheckoutSessionResponse,
} from './commerce-api-types';

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

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

export async function createCheckoutSession(
	input: ICreateCheckoutSessionInput
): Promise<ICreateCheckoutSessionResponse> {
	await sleep(700);

	const quote = await getCheckoutQuote(input);

	const previewOrderId = crypto.randomUUID();

	console.log('Mock checkout session created', {
		previewOrderId,
		input,
		quote,
	});

	return {
		previewOrderId,
		checkoutUrl: `/success?preview=1&order=${previewOrderId}`,
	};
}
