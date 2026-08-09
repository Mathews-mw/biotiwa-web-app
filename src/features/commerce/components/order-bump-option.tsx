import type { ICurrencyCode, IOrderBump } from '../types/commerce-entity-types';

import { cn } from '@/lib/utils';
import { formatMoney } from '../lib/format-money';

interface IProps {
	currentOrderBump: IOrderBump;
	includeOrderBump: boolean;
	locale: string;
	currency: ICurrencyCode;
	onSetIncludeOrderBump: () => void;
}

export function OrderBumpOption({
	currentOrderBump,
	includeOrderBump,
	currency,
	locale,
	onSetIncludeOrderBump,
}: IProps) {
	return (
		<button
			type="button"
			onClick={onSetIncludeOrderBump}
			className={cn(
				'flex w-full items-start gap-4 rounded-3xl border p-5 text-left transition-all',
				includeOrderBump ? 'border-brand-gold bg-brand-gold/10' : 'border-white/10 bg-white/2.5 hover:border-white/25'
			)}
		>
			<span
				className={cn(
					'mt-1 flex size-5 shrink-0 items-center justify-center rounded-md border',
					includeOrderBump ? 'border-brand-gold bg-brand-gold' : 'border-white/25'
				)}
			>
				{includeOrderBump ? <span className="size-2 rounded-sm bg-[#16091f]" /> : null}
			</span>

			<span className="flex-1">
				<span className="text-brand-gold block text-sm font-medium">Oferta adicional</span>

				<span className="mt-1 block text-lg font-medium">{currentOrderBump.name}</span>

				<span className="mt-2 block text-sm leading-6 text-white/45">{currentOrderBump.description}</span>

				<span className="mt-4 block text-xl font-semibold">
					+
					{formatMoney({
						amount: currentOrderBump.unit_amount,
						currency,
						locale,
					})}
				</span>
			</span>
		</button>
	);
}
