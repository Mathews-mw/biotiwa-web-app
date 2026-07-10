export type IMarketCode = 'BR' | 'US';

export type ICurrencyCode = 'BRL' | 'USD';

export type IMarket = {
	code: IMarketCode;
	label: string;
	locale: string;
	currency: ICurrencyCode;
	shippingAmount: number;
	taxRate: number;
};

export type IProduct = {
	id: string;
	sku: string;
	slug: string;
	name: string;
	shortDescription: string;
	imageUrl: string;
	pillsPerPack: number;
};

export type IOffer = {
	id: string;
	market: IMarketCode;
	name: string;
	description: string;
	quantity: number;
	unitAmount: number;
	discountPercent: number;
	isHighlighted?: boolean;
};

export type IOrderBump = {
	id: string;
	market: IMarketCode;
	name: string;
	description: string;
	unitAmount: number;
	quantity: number;
};

export type IOrderSummary = {
	subtotalAmount: number;
	discountAmount: number;
	shippingAmount: number;
	taxAmount: number;
	totalAmount: number;
	currency: ICurrencyCode;
};
