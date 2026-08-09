import type { IUser } from '@/features/account/types/user.types';
import type {
	ICurrencyCode,
	IMarket,
	IMarketCode,
	IOfferDetails,
	IOrderBumpDetails,
	IProduct,
} from '@/features/commerce/types/commerce-entity-types';

export type ICartStatus = 'ACTIVE' | 'CONVERTED' | 'ABANDONED';

export type ICartItemType = 'OFFER' | 'PRODUCT' | 'ORDER_BUMP';

export interface ICart {
	id: string;
	user_id: string;
	market_code: IMarketCode;
	status: ICartStatus;
	created_at: Date;
	updated_at?: Date | null;
}

export interface ICartItem {
	id: string;
	cart_id: string;
	product_id?: string | null;
	offer_id?: string | null;
	order_bump_id?: string | null;
	type: ICartItemType;
	quantity: number;
	created_at: Date;
	updated_at?: Date | null;
}

export interface ICartItemDetails extends ICartItem {
	product?: IProduct | null;
	offer?: IOfferDetails | null;
	order_bump?: IOrderBumpDetails | null;
}

export interface ICartDetails extends ICart {
	user: IUser;
	market: IMarket;
	items: Array<ICartItemDetails>;
}

export interface ICartSummary {
	items_amount: number;
	order_bump_amount: number;
	subtotal_amount: number;
	discount_amount: number;
	tax_amount: number;
	shipping_amount: number;
	total_amount: number;
	currency: ICurrencyCode;
	items: Array<ICartSummaryItem>;
}

export interface ICartSummaryItem {
	cart_item_id: string;
	type: ICartItemType;
	name: string;
	quantity: number;
	unit_amount: number;
	total_amount: number;
}
