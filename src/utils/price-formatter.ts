import { ICurrencyCode } from '@/features/commerce/types/commerce-entity-types';

export function priceFormatter({
	value,
	locale = 'pt-BR',
	currency = 'BRL',
}: {
	value: number;
	locale?: 'pt-BR' | 'en-US';
	currency?: ICurrencyCode;
}): string {
	return value.toLocaleString(locale, { style: 'currency', currency });
}
