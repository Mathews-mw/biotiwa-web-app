import { Separator } from '@/components/ui/separator';

import type { ICheckoutQuote } from '../types/checkout-types';

import { formatMoney } from '@/features/commerce/lib/format-money';

type CheckoutSummaryCardProps = {
	quote: ICheckoutQuote;
};

export function CheckoutSummaryCard({ quote }: CheckoutSummaryCardProps) {
	const { summary } = quote;

	return (
		<aside className="rounded-[2rem] border border-white/10 bg-white/4 p-6 text-white">
			<p className="text-brand-gold text-sm font-medium tracking-[0.25em] uppercase">Resumo do pedido</p>

			<div className="mt-6 space-y-4">
				{quote.items.map((item) => (
					<div key={item.cart_item_id} className="flex justify-between gap-4 text-sm">
						<div>
							<p className="font-medium">{item.name}</p>
							<p className="mt-1 text-white/45">Qtd. {item.quantity}</p>
						</div>

						<span>{formatMoney({ amount: item.total_amount, currency: summary.currency, locale: 'pt-BR' })}</span>
					</div>
				))}
			</div>

			<Separator className="my-6 bg-white/10" />

			<div className="space-y-3 text-sm text-white/65">
				<div className="flex justify-between">
					<span>Subtotal</span>
					<span>{formatMoney({ amount: summary.discount_amount, currency: summary.currency, locale: 'pt-BR' })}</span>
				</div>

				{summary.discount_amount > 0 && (
					<div className="flex justify-between text-emerald-200">
						<span>Desconto</span>
						<span>
							-{formatMoney({ amount: summary.discount_amount, currency: summary.currency, locale: 'pt-BR' })}
						</span>
					</div>
				)}

				<div className="flex justify-between">
					<span>Frete</span>
					<span>{formatMoney({ amount: summary.shipping_amount, currency: summary.currency, locale: 'pt-BR' })}</span>
				</div>

				<div className="flex justify-between">
					<span>Impostos</span>
					<span>{formatMoney({ amount: summary.tax_amount, currency: summary.currency, locale: 'pt-BR' })}</span>
				</div>
			</div>

			<Separator className="my-6 bg-white/10" />

			<div className="flex items-center justify-between">
				<span className="text-white/65">Total</span>
				<strong className="text-2xl">
					{formatMoney({ amount: summary.total_amount, currency: summary.currency, locale: 'pt-BR' })}
				</strong>
			</div>

			<p className="mt-4 text-xs text-white/40">Esta cotação pode ser recalculada antes do pagamento.</p>
		</aside>
	);
}
