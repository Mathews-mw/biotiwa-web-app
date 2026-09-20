import { ICurrencyCode, IMarketCode } from '@/features/commerce/types/commerce-entity-types';

export type IShippingProvider = 'MELHOR_ENVIO';
export type IShippingQuoteStatus = 'ACTIVE' | 'SELECTED' | 'EXPIRED';

export interface IShippingQuote {
	id: string;
	user_id: string;
	cart_id: string;
	market_code: IMarketCode;
	destination_postal_code: string;
	cart_fingerprint: string;
	status: IShippingQuoteStatus;
	expires_at: Date;
	created_at: Date;
	updated_at?: Date | null;
}

export interface IShippingRate {
	provider: IShippingProvider;
	service_id: string;
	service_name: string;
	carrier_name?: string | null;
	amount: number;
	currency: ICurrencyCode;
	company_picture?: string | null;
	estimated_days?: number | null;
}

export interface IShippingQuoteRate {
	id: string;
	shipping_quote_id: string;
	provider: IShippingProvider;
	service_id: string;
	service_name: string;
	carrier_name?: string | null;
	amount: number;
	currency: ICurrencyCode;
	estimated_days?: number | null;
	created_at: Date;
}

export interface IShippingQuoteDetails {
	quote: IShippingQuote;
	rates: Array<IShippingQuoteRate>;
}
