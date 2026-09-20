import type { ICartItemType, ICartSummaryItem } from '@/features/cart/types/cart-entities.types';
import type { IOrderDetails, IOrderStatus } from '@/features/order/types/order.types';
import type { IPaymentProvider, IPaymentStatus } from '@/features/payment/types/payment.types';
import type { ICurrencyCode, IMarketCode } from '@/features/commerce/types/commerce-entity-types';
import { IShippingProvider } from '@/features/shipping/types/shipping-types';

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
	provider_session_id?: string | null;
	provider_payment_intent?: string | null;
	created_at: Date;
	order: IOrderDetails;
}

export interface ICheckoutSessionStatus {
	provider_session_id?: string | null;
	payment_provider: IPaymentProvider;
	payment_status: IPaymentStatus;
	order_id: string;
	order_status: IOrderStatus;
	currency: ICurrencyCode;
	amount: number;
	is_paid: boolean;
	is_pending: boolean;
	is_failed: boolean;
	is_expired: boolean;
	created_at: Date;
	updated_at?: Date | null;
	order: IOrderDetails;
}

export interface ICheckoutShippingSummary {
	rate_id: string;
	provider: IShippingProvider;
	service_name: string;
	carrier_name?: string | null;
	amount: number;
	estimated_days?: number | null;
}
export interface ICheckoutSummary {
	items_amount: number;
	order_bump_amount: number;
	subtotal_amount: number;
	discount_amount: number;
	tax_amount: number;
	cart_amount: number;
	shipping_amount?: number | null;
	shipping?: ICheckoutShippingSummary | null;
	total_amount: number;
	currency: ICurrencyCode;
	items: Array<ICartSummaryItem>;
}
