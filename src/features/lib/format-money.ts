import type { ICurrencyCode } from '../commerce/types/commerce';

type IFormatMoneyParams = {
	amount: number;
	currency: ICurrencyCode;
	locale: string;
};

export function formatMoney({ amount, currency, locale }: IFormatMoneyParams) {
	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency,
	}).format(amount / 100);
}
