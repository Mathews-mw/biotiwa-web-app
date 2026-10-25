import { INVALID_REFERRAL_CODES } from '../constants/invalid-referral-codes';

export function isInvalidPromotionError(errorCode: string) {
	return INVALID_REFERRAL_CODES.has(errorCode);
}
