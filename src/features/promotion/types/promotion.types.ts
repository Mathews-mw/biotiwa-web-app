import { IMarketCode } from '@/features/commerce/types/commerce-entity-types';

export type IPromotionCodeType = 'COUPON' | 'AFFILIATE';
export type IPromotionCodeStatus = 'ACTIVE' | 'INACTIVE';
export type IPromotionDiscountType = 'PERCENTAGE' | 'FIXED';
export type IPromotionRedemptionStatus = 'PENDING' | 'REDEEMED' | 'CANCELED' | 'EXPIRED';

export interface IPromotionCode {
	id: string;
	code: string;
	type: IPromotionCodeType;
	status: IPromotionCodeStatus;
	market_code: IMarketCode;
	discount_type: IPromotionDiscountType;
	discount_value: number;
	max_uses: number | null;
	max_uses_per_customer: number | null;
	starts_at: Date | null;
	expires_at: Date | null;
	created_at: Date;
	updated_at?: Date | null;
}

export interface IPromotionCodeDetails extends IPromotionCode {
	redemptions: IPromotionRedemption[];
}

export interface IPromotionRedemption {
	id: string;
	promotion_code_id: string;
	user_id: string;
	order_id: string;
	status: IPromotionRedemptionStatus;
	discount_amount: number;
	reserved_until?: Date | null;
	redeemed_at?: Date | null;
	canceled_at?: Date | null;
	expired_at?: Date | null;
	created_at: Date;
	updated_at?: Date | null;
}
