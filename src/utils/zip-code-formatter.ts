export function zipCodeFormatter({ zipCode, locale = 'pt-BR' }: { zipCode: string; locale?: string }): string {
	if (locale === 'pt-BR') {
		const zipCodeWithoutMask = zipCode.replace(/\D/g, '');
		const zipCodeWithMask = zipCodeWithoutMask.replace(/(\d{5})(\d{3})/, '$1-$2');

		return zipCodeWithMask;
	}

	return zipCode;
}
