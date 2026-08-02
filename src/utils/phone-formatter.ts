export function phoneFormatter(value: string): string {
	return value
		.replace(/\D/g, '')
		.replace(/^(\d{2})(\d)/, '($1) $2')
		.replace(/(\d{1})\s(\d)/, '$1 $2')
		.replace(/(\d{4})(\d{4})$/, '$1-$2');
}
