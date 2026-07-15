import { UseFormReturn } from 'react-hook-form';

import type { ICheckoutFormInput } from '../../schemas/checkout-schema';
import type { ICheckoutQuoteResponse } from '@/features/commerce/api/commerce-api-types';

import { Field } from '@/components/field';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { MapPinned } from 'lucide-react';

type AddressStepProps = {
	form: UseFormReturn<ICheckoutFormInput>;
	isBrazil: boolean;
	selection: ICheckoutQuoteResponse;
};

export function AddressStep({ form, isBrazil, selection }: AddressStepProps) {
	return (
		<Card className="border-white/10 bg-white/4 p-6 text-white">
			<div className="flex items-start gap-4">
				<div className="bg-brand-gold/15 text-brand-gold flex size-10 shrink-0 items-center justify-center rounded-full">
					<MapPinned className="size-5" />
				</div>

				<div>
					<h2 className="text-xl font-medium">Endereço de entrega</h2>

					<p className="mt-2 text-sm leading-6 text-white/45">
						Mercado selecionado: <span className="font-medium text-white">{selection.market.label}</span>
					</p>
				</div>
			</div>

			<div className="mt-7 grid gap-5 sm:grid-cols-2">
				<Field label={isBrazil ? 'CEP' : 'ZIP code'} error={form.formState.errors.postalCode?.message}>
					<Input
						placeholder={isBrazil ? '00000-000' : '00000'}
						className="border-white/10 bg-white/5 text-white placeholder:text-white/25"
						{...form.register('postalCode')}
					/>
				</Field>

				<Field label={isBrazil ? 'Estado' : 'State'} error={form.formState.errors.state?.message}>
					<Input
						placeholder={isBrazil ? 'AM' : 'FL'}
						className="border-white/10 bg-white/5 text-white placeholder:text-white/25"
						{...form.register('state')}
					/>
				</Field>

				<Field
					label={isBrazil ? 'Endereço' : 'Address line 1'}
					error={form.formState.errors.addressLine1?.message}
					className="sm:col-span-2"
				>
					<Input
						placeholder={isBrazil ? 'Rua, avenida ou logradouro' : 'Street address'}
						className="border-white/10 bg-white/5 text-white placeholder:text-white/25"
						{...form.register('addressLine1')}
					/>
				</Field>

				<Field label={isBrazil ? 'Número' : 'Number / Apt'} error={form.formState.errors.number?.message}>
					<Input
						placeholder={isBrazil ? '123' : 'Apt 203'}
						className="border-white/10 bg-white/5 text-white placeholder:text-white/25"
						{...form.register('number')}
					/>
				</Field>

				<Field label="Complemento" error={form.formState.errors.addressLine2?.message}>
					<Input
						placeholder="Opcional"
						className="border-white/10 bg-white/5 text-white placeholder:text-white/25"
						{...form.register('addressLine2')}
					/>
				</Field>

				{isBrazil ? (
					<Field label="Bairro" error={form.formState.errors.district?.message}>
						<Input
							placeholder="Nome do bairro"
							className="border-white/10 bg-white/5 text-white placeholder:text-white/25"
							{...form.register('district')}
						/>
					</Field>
				) : null}

				<Field
					label={isBrazil ? 'Cidade' : 'City'}
					error={form.formState.errors.city?.message}
					className={isBrazil ? undefined : 'sm:col-span-2'}
				>
					<Input
						placeholder={isBrazil ? 'Manaus' : 'Miami'}
						className="border-white/10 bg-white/5 text-white placeholder:text-white/25"
						{...form.register('city')}
					/>
				</Field>
			</div>
		</Card>
	);
}
