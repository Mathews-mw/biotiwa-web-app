import { ICurrencyCode } from '../types/commerce-entity-types';

type IFormatMoneyParams = {
	amount: number;
	currency: ICurrencyCode;
	locale: string;
};

export function formatMoney({ amount, currency = 'BRL', locale = 'pt-BR' }: IFormatMoneyParams) {
	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency,
	}).format(amount / 100);
}
