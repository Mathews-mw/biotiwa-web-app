import type { IShippingQuoteRate } from '@/features/shipping/types/shipping-types';

import { priceFormatter } from '@/utils/price-formatter';

import { RadioGroupItem } from '@/components/ui/radio-group';
import { Field, FieldContent, FieldLabel, FieldTitle } from '@/components/ui/field';

import { Clock3 } from 'lucide-react';

type ShippingRateOptionProps = {
	rate: IShippingQuoteRate;
};

export function ShippingRateOption({ rate }: ShippingRateOptionProps) {
	return (
		<FieldLabel
			htmlFor={rate.id}
			className="hover:bg-primary/10 cursor-pointer rounded-xl border border-white/10 p-4 transition-colors"
		>
			<Field orientation="horizontal">
				<FieldContent>
					<div className="flex items-start justify-between gap-4">
						<div>
							<FieldTitle>{rate.service_name}</FieldTitle>

							{rate.carrier_name && <p className="mt-1 text-sm text-white/50">{rate.carrier_name}</p>}
						</div>

						<p className="font-medium text-white">
							{priceFormatter({ value: rate.amount / 100, currency: rate.currency, locale: 'pt-BR' })}
						</p>
					</div>

					{rate.estimated_days !== null && (
						<div className="mt-3 flex items-center gap-2 text-sm text-white/50">
							<Clock3 className="size-4" />

							<span>Entrega estimada em {rate.estimated_days} dias úteis</span>
						</div>
					)}
				</FieldContent>

				<RadioGroupItem id={rate.id} value={rate.id} />
			</Field>
		</FieldLabel>
	);
}
