import type { ICartItemType } from '@/features/cart/types/cart-entities.types';
import type { ICurrencyCode, IMarketCode } from '@/features/commerce/types/commerce-entity-types';

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

export interface ICheckoutQuote {
	cart_id: string;
	market_code: IMarketCode;
	currency: ICurrencyCode;
	expires_at: Date;
	created_at: Date;
	items: Array<{
		cart_item_id: string;
		type: ICartItemType;
		name: string;
		quantity: number;
		unit_amount: number;
		total_amount: number;
	}>;
	summary: {
		items_amount: number;
		order_bump_amount: number;
		subtotal_amount: number;
		discount_amount: number;
		tax_amount: number;
		shipping_amount: number;
		total_amount: number;
		currency: ICurrencyCode;
	};
}

export type ICheckout = ICheckoutQuote;

export interface ICheckoutSession {
	order_id: string;
	status: IOrderStatus;
	amount: number;
	currency: ICurrencyCode;
	payment_url?: string | null;
	payment_provider?: string | null;
	created_at: Date;
	order: IOrderDetails;
}

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

export interface IOrderDetails extends IOrder {
	items: Array<IOrderItem>;
}
