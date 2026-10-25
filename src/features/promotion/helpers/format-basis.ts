export function formatBasisPoints(value: number) {
	const percentage = value / 100;

	return `${percentage.toLocaleString('pt-BR')}%`;
}
