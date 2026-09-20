'use client';

import { useEffect, useRef } from 'react';
import { useWatch, type UseFormReturn } from 'react-hook-form';

import type { ICheckoutFormInput } from '../../../schemas/checkout-schema';

import { useCreateShippingQuoteMutation } from '@/features/shipping/hooks/use-shipping-queries';

import { Card } from '@/components/ui/card';
import { RadioGroup } from '@/components/ui/radio-group';
import { ShippingRateOption } from './shipping-rate-option';
import { NoShippingRates, ShippingRatesError, ShippingRatesLoading } from './shipping-states';

import { Truck } from 'lucide-react';

type ShippingStepProps = {
	form: UseFormReturn<ICheckoutFormInput>;
};

export function ShippingStep({ form }: ShippingStepProps) {
	const postalCode = useWatch({ control: form.control, name: 'postalCode' });
	const selectedShippingRateId = useWatch({ control: form.control, name: 'shippingRateId' });

	const createShippingQuoteMutation = useCreateShippingQuoteMutation();

	const {
		mutateAsync: createShippingQuote,
		data: shippingQuoteData,
		status,
		error,
		isPending,
		isError,
	} = createShippingQuoteMutation;

	const lastQuotedPostalCodeRef = useRef<string | null>(null);

	const rates = shippingQuoteData?.rates ?? [];

	useEffect(() => {
		const normalizedPostalCode = postalCode?.replace(/\D/g, '');

		if (!normalizedPostalCode || normalizedPostalCode.length !== 8) {
			return;
		}

		if (lastQuotedPostalCodeRef.current === normalizedPostalCode) {
			return;
		}

		lastQuotedPostalCodeRef.current = normalizedPostalCode;

		if (form.getValues('shippingRateId')) {
			form.setValue('shippingRateId', '', {
				shouldValidate: true,
				shouldDirty: false,
			});
		}

		async function loadShippingQuote() {
			try {
				await createShippingQuote({
					postalCode: normalizedPostalCode,
				});
			} catch (error) {
				console.error('[ShippingStep] mutation ERROR', error);
			}
		}

		void loadShippingQuote();
	}, [postalCode, form, createShippingQuote]);

	const handleShippingRateChange = (rateId: string) => {
		form.setValue('shippingRateId', rateId, {
			shouldDirty: true,
			shouldValidate: true,
		});
	};

	return (
		<Card className="border-white/10 bg-white/4 p-6 text-white">
			<div className="flex items-start gap-4">
				<div className="bg-brand-gold/15 text-brand-gold flex size-10 shrink-0 items-center justify-center rounded-full">
					<Truck className="size-5" />
				</div>

				<div>
					<h2 className="text-xl font-medium">Forma de entrega</h2>

					<p className="mt-2 text-sm text-white/50">Escolha a opção de entrega que melhor atende você.</p>
				</div>
			</div>

			<div className="mt-6">
				{(status === 'pending' || isPending) && <ShippingRatesLoading />}

				{(status === 'error' || isError) && <ShippingRatesError error={error} />}

				{!isPending && !isError && rates.length === 0 && <NoShippingRates />}

				{!isPending && rates.length > 0 && (
					<RadioGroup value={selectedShippingRateId} onValueChange={handleShippingRateChange} className="space-y-3">
						{rates.map((rate) => (
							<ShippingRateOption key={rate.id} rate={rate} />
						))}
					</RadioGroup>
				)}
			</div>
		</Card>
	);
}
