import { Controller, UseFormReturn } from 'react-hook-form';

import type { ICheckoutFormInput } from '../../schemas/checkout-schema';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { DateInput } from '@/components/date-input';
import { PhoneInput } from '@/components/phone-input';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';

import { ShieldCheck, UserRound } from 'lucide-react';

type CustomerStepProps = {
	form: UseFormReturn<ICheckoutFormInput>;
};

export function CustomerStep({ form }: CustomerStepProps) {
	return (
		<Card className="border-white/10 bg-white/4 p-6 text-white">
			<div className="flex items-start justify-between gap-6">
				<div>
					<div className="flex items-center gap-3">
						<div className="bg-brand-gold/15 text-brand-gold flex size-10 items-center justify-center rounded-full">
							<UserRound className="size-5" />
						</div>

						<h2 className="text-xl font-medium">Dados do comprador</h2>
					</div>

					<p className="mt-3 text-sm leading-6 text-white/45">
						Nome e e-mail são preenchidos com sua sessão. Você pode revisar antes de avançar.
					</p>
				</div>

				<ShieldCheck className="text-brand-gold mt-1 size-5" />
			</div>

			<div className="mt-7 grid gap-5 sm:grid-cols-2">
				<Field data-invalid={!!form.formState.errors.fullName}>
					<FieldLabel htmlFor="fullName">Nome completo</FieldLabel>
					<Input
						placeholder="Seu nome"
						data-invalid={!!form.formState.errors.fullName}
						className="border-white/10 bg-white/5 text-white placeholder:text-white/25"
						{...form.register('fullName')}
					/>
					<FieldError errors={[form.formState.errors.fullName]} />
				</Field>

				<Field data-invalid={!!form.formState.errors.email}>
					<FieldLabel htmlFor="email">Nome completo</FieldLabel>
					<Input
						type="email"
						placeholder="voce@email.com"
						data-invalid={!!form.formState.errors.email}
						className="border-white/10 bg-white/5 text-white placeholder:text-white/25"
						{...form.register('email')}
					/>
					<FieldError errors={[form.formState.errors.email]} />
				</Field>

				<Controller
					name="birthDate"
					control={form.control}
					render={({ field, fieldState }) => {
						return (
							<Field data-invalid={fieldState.invalid} className="space-y-2">
								<FieldLabel htmlFor="birthday">Data de nascimento*</FieldLabel>
								<DateInput
									{...field}
									id="birthDate"
									aria-invalid={fieldState.invalid}
									value={field.value}
									onChange={field.onChange}
								/>
								<FieldError errors={[fieldState.error]} />
							</Field>
						);
					}}
				/>

				<Controller
					name="phone"
					control={form.control}
					render={({ field, fieldState }) => {
						return (
							<Field data-invalid={fieldState.invalid} className="space-y-2">
								<FieldLabel htmlFor="phone">Telefone</FieldLabel>
								<PhoneInput
									{...field}
									id="phone"
									aria-invalid={fieldState.invalid}
									value={field.value}
									onChange={field.onChange}
								/>
								<FieldError errors={[fieldState.error]} />
							</Field>
						);
					}}
				/>
			</div>
		</Card>
	);
}
