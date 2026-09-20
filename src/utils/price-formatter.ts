export function priceFormatter({
	value,
	locale = 'pt-BR',
	currency = 'BRL',
}: {
	value: number;
	locale?: string;
	currency?: string;
}): string {
	return value.toLocaleString(locale, { style: 'currency', currency });
}
