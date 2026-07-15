import Image from 'next/image';

import type { ICheckoutQuoteResponse } from '@/features/commerce/api/commerce-api-types';

import { product } from '@/features/commerce/data/mock-catalog';
import { formatMoney } from '@/features/commerce/lib/format-money';

import { SummaryRow } from './summary-row';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { LockKeyhole } from 'lucide-react';

type CheckoutSummaryProps = {
	locale: string;
	currency: 'BRL' | 'USD';
	selection: ICheckoutQuoteResponse;
};

export function CheckoutSummary({ locale, currency, selection }: CheckoutSummaryProps) {
	return (
		<Card className="border-white/10 bg-white/4 p-6 text-white shadow-2xl shadow-black/20">
			<div className="flex gap-4">
				<div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-white/5">
					<Image src={product.imageUrl} alt={product.name} fill sizes="80px" className="object-contain p-2" />
				</div>

				<div>
					<p className="font-medium">{product.name}</p>

					<p className="mt-1 text-sm leading-5 text-white/45">{selection.offer.name}</p>

					<p className="text-brand-gold mt-2 text-xs">
						{selection.market.label} · {currency}
					</p>
				</div>
			</div>

			<Separator className="my-6 bg-white/10" />

			<div className="space-y-3 text-sm">
				<SummaryRow
					label="Subtotal"
					value={formatMoney({
						amount: selection.summary.subtotalAmount,
						currency,
						locale,
					})}
				/>

				<SummaryRow
					label="Desconto"
					value={`- ${formatMoney({
						amount: selection.summary.discountAmount,
						currency,
						locale,
					})}`}
				/>

				<SummaryRow
					label="Frete estimado"
					value={formatMoney({
						amount: selection.summary.shippingAmount,
						currency,
						locale,
					})}
				/>

				<SummaryRow
					label="Imposto estimado"
					value={formatMoney({
						amount: selection.summary.taxAmount,
						currency,
						locale,
					})}
				/>

				{selection.orderBump ? (
					<SummaryRow
						label="Oferta adicional"
						value={formatMoney({
							amount: selection.orderBump.unitAmount * selection.orderBump.quantity,
							currency,
							locale,
						})}
					/>
				) : null}
			</div>

			<Separator className="my-6 bg-white/10" />

			<div className="flex items-end justify-between gap-4">
				<span className="text-base font-medium">Total</span>

				<span className="text-brand-gold text-3xl font-semibold tracking-[-0.04em]">
					{formatMoney({
						amount: selection.summary.totalAmount,
						currency,
						locale,
					})}
				</span>
			</div>

			<div className="mt-6 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/3 p-4 text-xs leading-5 text-white/45">
				<LockKeyhole className="text-brand-gold size-4 shrink-0" />O pagamento final será processado em ambiente seguro
				via Stripe.
			</div>
		</Card>
	);
}
