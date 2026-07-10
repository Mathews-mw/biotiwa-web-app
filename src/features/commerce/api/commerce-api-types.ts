import type { IMarket, IMarketCode, IOffer, IOrderBump, IOrderSummary, IProduct } from '../types/commerce';

export type IGetOffersParams = {
	market: IMarketCode;
};

export type IGetOffersResponse = {
	market: IMarket;
	product: IProduct;
	offers: IOffer[];
	orderBump: IOrderBump | null;
};

export type ICheckoutQuoteInput = {
	market: IMarketCode;
	offerId: string;
	includeOrderBump: boolean;
	postalCode?: string;
};

export type ICheckoutQuoteResponse = {
	market: IMarket;
	offer: IOffer;
	orderBump: IOrderBump | null;
	summary: IOrderSummary;
};

export type ICheckoutCustomerInput = {
	fullName: string;
	email: string;
	age: number;
	sportPractice: string;
	postalCode: string;
	addressLine1: string;
	number?: string;
	addressLine2?: string;
	district?: string;
	city: string;
	state: string;
	acceptPrivacy: boolean;
};

export type ICreateCheckoutSessionInput = ICheckoutQuoteInput & {
	customer: ICheckoutCustomerInput;
};

export type ICreateCheckoutSessionResponse = {
	previewOrderId: string;
	checkoutUrl: string;
};
