import { getOfferTotalQuantity } from './get-offer-total-quantity';

import type { IMarket, IOffer, IOrderBump, IOrderSummary } from '../types/commerce';

type ICalculateOrderSummaryParams = {
	market: IMarket;
	offer: IOffer;
	orderBump?: IOrderBump | null;
};

export function calculateOrderSummary({ market, offer, orderBump }: ICalculateOrderSummaryParams): IOrderSummary {
	const offerQuantity = getOfferTotalQuantity(offer);
	const offerSubtotalAmount = offer.unit_amount * offerQuantity;

	const discountAmount = Math.round(offerSubtotalAmount * (offer.discount_percent / 100));

	const orderBumpAmount = orderBump ? orderBump.unit_amount * orderBump.quantity : 0;

	const subtotalAmount = offerSubtotalAmount + orderBumpAmount;

	const taxableAmount = subtotalAmount - discountAmount;

	const taxAmount = Math.round(taxableAmount * market.tax_rate);

	const totalAmount = taxableAmount + market.shipping_amount + taxAmount;

	return {
		subtotalAmount,
		discountAmount,
		shippingAmount: market.shipping_amount,
		taxAmount,
		totalAmount,
		currency: market.currency,
	};
}
