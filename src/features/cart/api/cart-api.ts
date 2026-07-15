import { getCheckoutQuote } from '@/features/commerce/api/commerce-api';
import { clearStoredCart, getStoredCart, storeCart } from '../lib/cart-storage';

import type {
	IClearCartInput,
	IGetCartInput,
	IGetCartResponse,
	ISaveCartSelectionInput,
	ISaveCartSelectionResponse,
} from '../types/cart-api-types';

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getCart({ userId }: IGetCartInput): Promise<IGetCartResponse> {
	await sleep(180);

	return {
		cart: getStoredCart(userId),
	};
}

export async function saveCartSelection(input: ISaveCartSelectionInput): Promise<ISaveCartSelectionResponse> {
	await sleep(250);

	const quote = await getCheckoutQuote({
		market: input.market,
		offerId: input.offerId,
		includeOrderBump: input.includeOrderBump,
	});

	const existingCart = getStoredCart(input.userId);

	const cart = {
		id: existingCart?.id ?? crypto.randomUUID(),
		userId: input.userId,
		market: input.market,
		offerId: input.offerId,
		includeOrderBump: input.includeOrderBump,
		summary: quote.summary,
		updatedAt: new Date().toISOString(),
	};

	storeCart(cart);

	return {
		cart,
	};
}

export async function clearCart(input: IClearCartInput) {
	await sleep(180);

	clearStoredCart(input.userId);

	return {
		ok: true,
	};
}
