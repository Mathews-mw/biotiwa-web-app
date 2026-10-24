import type { IUser } from '@/features/account/types/user.types';
import type { ICurrencyCode, IMarketCode } from '@/features/commerce/types/commerce-entity-types';
import type { IPromotionCode, IPromotionDiscountType } from '@/features/promotion/types/promotion.types';

export type IAffiliateType = 'PROMOTER' | 'RESELLER';
export type IAffiliateStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'INACTIVE';
export type IAffiliateCommissionStatus = 'PENDING' | 'AVAILABLE' | 'PAID' | 'CANCELED';

export interface IAffiliate {
	id: string;
	user_id: string;
	type: IAffiliateType;
	status: IAffiliateStatus;
	created_at: Date;
	updated_at?: Date | null;
}

export interface IAffiliateDetails {
	affiliate: IAffiliate;
	user: IUser;
}

export interface IAffiliatePromotionCode {
	id: string;
	affiliate_id: string;
	promotion_code_id: string;
	commission_rate: number;
	created_at: Date;
	updated_at?: Date | null;
}

export interface AffiliateCommission {
	id: string;
	affiliate_id: string;
	order_id: string;
	promotion_code: string;
	commission_base_amount: number;
	commission_rate: number;
	commission_amount: number;
	currency: ICurrencyCode;
	status: IAffiliateCommissionStatus;
	available_at?: Date | null;
	paid_at?: Date | null;
	canceled_at: Date | null;
	created_at: Date;
	updated_at?: Date | null;
}

export interface AffiliateProgramSettings {
	id: string;
	market_code: IMarketCode;
	min_code_lifetime_days: number;
	max_code_lifetime_days: number;
	attribution_window_days: number;
	self_service_code_creation_enabled: boolean;
	max_active_codes_per_affiliate: number;
	default_affiliate_discount_type: IPromotionDiscountType;
	default_affiliate_discount_value: number;
	default_affiliate_commission_rate: number;
	max_uses_per_customer_limit: number;
	is_active: boolean;
	created_at: Date;
	updated_at?: Date | null;
}

export interface IAffiliatePromotionCodeDetails {
	affiliate: IAffiliate;
	promotion_code: IPromotionCode;
	affiliate_promotion_code: IAffiliatePromotionCode;
}

export interface IAffiliateDashboardFinancial {
	currency: ICurrencyCode;
	sales_count: number;
	sales_amount: number;
	commission_amount: number;
	pending_amount: number;
	available_amount: number;
	paid_amount: number;
}

export interface IAffiliateDashboard {
	affiliate: {
		id: string;
		type: IAffiliateType;
		status: IAffiliateStatus;
	};
	sales_count: number;
	financials: Array<IAffiliateDashboardFinancial>;
	promotion_codes: {
		total: number;
		active: number;
	};
}

export interface IAffiliateSales {
	commission_id: string;
	order_id: string;
	promotion_code: string;
	sale_amount: number;
	commission_rate: number;
	commission_amount: number;
	commission_status: IAffiliateCommissionStatus;
	currency: ICurrencyCode;
	created_at: Date;
}

export interface IAffiliatePromotionCodeSettings {
	enabled: boolean;
	active_codes: number;
	settings: AffiliateProgramSettings;
}
