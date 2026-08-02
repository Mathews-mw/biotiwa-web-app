import type { IOffer } from '../types/commerce';

export function getOfferTotalQuantity(offer: IOffer) {
	return offer.items.reduce((total, item) => {
		return total + item.quantity;
	}, 0);
}
