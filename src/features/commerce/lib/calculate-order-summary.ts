import type { IMarket, IOffer, IOrderBump, IOrderSummary } from '../commerce/types/commerce';

type ICalculateOrderSummaryParams = {
	market: IMarket;
	offer: IOffer;
	orderBump?: IOrderBump | null;
};

export function calculateOrderSummary({ market, offer, orderBump }: ICalculateOrderSummaryParams): IOrderSummary {
	const offerSubtotal = offer.unitAmount * offer.quantity;

	const bumpSubtotal = orderBump ? orderBump.unitAmount * orderBump.quantity : 0;

	const subtotalAmount = offerSubtotal + bumpSubtotal;

	const discountAmount = Math.round(offerSubtotal * (offer.discountPercent / 100));

	const taxableAmount = Math.max(subtotalAmount - discountAmount, 0);

	const taxAmount = Math.round(taxableAmount * market.taxRate);

	const totalAmount = subtotalAmount - discountAmount + market.shippingAmount + taxAmount;

	return {
		subtotalAmount,
		discountAmount,
		shippingAmount: market.shippingAmount,
		taxAmount,
		totalAmount,
		currency: market.currency,
	};
}
