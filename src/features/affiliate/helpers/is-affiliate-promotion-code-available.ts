import type { IPromotionCodeStatus } from '@/features/promotion/types/promotion.types';

interface IInput {
	status: IPromotionCodeStatus;
	expiresAt?: Date | string | null;
}

export function isAffiliatePromotionCodeAvailable({ status, expiresAt }: IInput) {
	if (status !== 'ACTIVE') {
		return false;
	}

	if (expiresAt && new Date(expiresAt) <= new Date()) {
		return false;
	}

	return true;
}
