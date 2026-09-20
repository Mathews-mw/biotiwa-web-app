import { ICountryCode } from '@/core/types/country-code';
import type { ICurrencyCode, IMarketCode, IProduct } from '@/features/commerce/types/commerce-entity-types';

export type IOrderItemType = 'OFFER_ITEM' | 'PRODUCT' | 'ORDER_BUMP';

export type IOrderStatus =
	| 'PENDING_PAYMENT'
	| 'PAID'
	| 'PROCESSING'
	| 'SHIPPED'
	| 'DELIVERED'
	| 'CANCELED'
	| 'REFUNDED'
	| 'PAYMENT_FAILED'
	| 'EXPIRED';

export interface IOrder {
	id: string;
	user_id: string;
	cart_id?: string | null;
	market_code: IMarketCode;
	currency: ICurrencyCode;
	status: IOrderStatus;
	items_amount: number;
	order_bump_amount: number;
	subtotal_amount: number;
	discount_amount: number;
	tax_amount: number;
	shipping_amount: number;
	total_amount: number;
	expires_at?: Date | null;
	created_at: Date;
	updated_at?: Date | null;
}

export interface IOrderItem {
	id: string;
	order_d: string;
	product_d?: string | null;
	type: IOrderItemType;
	name: string;
	sku: string;
	quantity: number;
	unit_amount: number;
	total_amount: number;
	metadata?: Record<string, unknown> | null;
	created_at: Date;
}

export interface IOrderCustomer {
	id: string;
	order_d: string;
	name: string;
	email: string;
	phone?: string | null;
	document?: string | null;
	birth_date?: string | null;
	created_at: Date;
	updated_at?: Date | null;
}

export interface IOrderShippingAddress {
	id: string;
	order_d: string;
	zip_code: string;
	street: string;
	number?: string | null;
	complement?: string | null;
	district?: string | null;
	city: string;
	state: string;
	country_code: ICountryCode;
	created_at: Date;
	updated_at?: Date | null;
}

export interface IOrderItemDetails extends IOrderItem {
	product?: IProduct | null;
}

export interface IOrderDetails extends IOrder {
	order_customer?: IOrderCustomer | null;
	order_shipping_address?: IOrderShippingAddress | null;
	items: Array<IOrderItemDetails>;
}
