import { calculateOrderSummary } from '../lib/calculate-order-summary';
import { markets, offers, orderBumps, product } from '../data/mock-catalog';

import type {
	ICheckoutQuoteInput,
	ICheckoutQuoteResponse,
	ICreateCheckoutSessionInput,
	ICreateCheckoutSessionResponse,
	IGetOffersParams,
	IGetOffersResponse,
} from './commerce-api-types';

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getPublicOffers({ market }: IGetOffersParams): Promise<IGetOffersResponse> {
	await sleep(350);

	const selectedMarket = markets.find((item) => item.code === market);

	if (!selectedMarket) {
		throw new Error('Mercado não encontrado.');
	}

	const marketOffers = offers.filter((offer) => offer.market === market);

	const marketOrderBump = orderBumps.find((orderBump) => orderBump.market === market) ?? null;

	return {
		market: selectedMarket,
		product,
		offers: marketOffers,
		orderBump: marketOrderBump,
	};
}

export async function getCheckoutQuote(input: ICheckoutQuoteInput): Promise<ICheckoutQuoteResponse> {
	await sleep(250);

	const selectedMarket = markets.find((market) => {
		return market.code === input.market;
	});

	if (!selectedMarket) {
		throw new Error('Mercado não encontrado.');
	}

	const selectedOffer = offers.find((offer) => {
		return offer.id === input.offerId && offer.market === input.market;
	});

	if (!selectedOffer) {
		throw new Error('Oferta não encontrada.');
	}

	const selectedOrderBump = input.includeOrderBump
		? (orderBumps.find((orderBump) => {
				return orderBump.market === input.market;
			}) ?? null)
		: null;

	const summary = calculateOrderSummary({
		market: selectedMarket,
		offer: selectedOffer,
		orderBump: selectedOrderBump,
	});

	return {
		market: selectedMarket,
		offer: selectedOffer,
		orderBump: selectedOrderBump,
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
