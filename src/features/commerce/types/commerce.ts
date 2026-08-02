export type IMarketCode = 'BR' | 'US';

export type ICurrencyCode = 'BRL' | 'USD';

export type IProductStatus = 'DRAFT' | 'ACTIVE' | 'ARCHIVED';

export type IOfferStatus = 'DRAFT' | 'ACTIVE' | 'ARCHIVED';

export interface IMarket {
	id: string;
	code: IMarketCode;
	label: string;
	locale: string;
	currency: ICurrencyCode;
	shipping_amount: number;
	tax_rate: number;
	is_active: boolean;
	created_at: Date | string;
	updated_at?: Date | string | null;
}

export interface IProduct {
	id: string;
	sku: string;
	slug: string;
	name: string;
	short_description: string;
	description?: string | null;
	image_url?: string | null;
	pills_per_pack: number;
	status: IProductStatus;
	created_at: Date | string;
	updated_at?: Date | string | null;
}

export interface IOffer {
	id: string;
	slug: string;
	market_code: IMarketCode;
	name: string;
	description: string;
	unit_amount: number;
	discount_percent: number;
	is_highlighted: boolean;
	status: IOfferStatus;
	sort_order: number;
	created_at: Date | string;
	updated_at?: Date | string | null;
	items: IOfferItem[];
}

export interface IOfferItem {
	id: string;
	offer_id: string;
	product_id: string;
	quantity: number;
	created_at: Date | string;
}
export interface IOrderBump {
	id: string;
	product_id: string;
	market_code: IMarketCode;
	name: string;
	description: string;
	unit_amount: number;
	quantity: number;
	is_active: boolean;
	sort_order: number;
	created_at: Date | string;
	updated_at?: Date | string | null;
}

export interface IOrderSummary {
	subtotalAmount: number;
	discountAmount: number;
	shippingAmount: number;
	taxAmount: number;
	totalAmount: number;
	currency: ICurrencyCode;
}
