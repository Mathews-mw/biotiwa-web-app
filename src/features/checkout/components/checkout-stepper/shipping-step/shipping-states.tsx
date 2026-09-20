export function ShippingRatesLoading() {
	return (
		<div className="space-y-3">
			{Array.from({
				length: 2,
			}).map((_, index) => (
				<div key={index} className="h-24 animate-pulse rounded-xl border border-white/10 bg-white/5" />
			))}

			<p className="text-center text-sm text-white/40">Calculando as melhores opções de entrega...</p>
		</div>
	);
}

export function NoShippingRates() {
	return (
		<div className="rounded-xl border border-dashed border-white/15 p-6 text-center">
			<p className="text-sm font-medium text-white">Nenhuma opção de entrega disponível.</p>

			<p className="mt-2 text-sm text-white/45">Verifique o endereço selecionado ou tente novamente.</p>
		</div>
	);
}

export function ShippingRatesError({ error }: { error: unknown }) {
	return (
		<div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
			<p className="text-sm font-medium">Não foi possível calcular o frete.</p>

			<p className="mt-1 text-sm text-white/50">Tente novamente em alguns instantes.</p>
		</div>
	);
}
