import type { IPromotionDiscountType } from '../types/promotion.types';
import type { IMarketCode } from '@/features/commerce/types/commerce-entity-types';

import { formatBasisPoints } from './format-basis';
import { priceFormatter } from '@/utils/price-formatter';

export function formatPromotionDiscount({
	discountType,
	discountValue,
	marketCode,
}: {
	discountType: IPromotionDiscountType;
	discountValue: number;
	marketCode: IMarketCode;
}) {
	if (discountType === 'PERCENTAGE') {
		return formatBasisPoints(discountValue);
	}

	return priceFormatter({ value: discountValue, currency: marketCode === 'BR' ? 'BRL' : 'USD' });
}
