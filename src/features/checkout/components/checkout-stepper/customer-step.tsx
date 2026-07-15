import { UseFormReturn } from 'react-hook-form';

import { Field } from '@/components/field';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ICheckoutFormInput } from '../../schemas/checkout-schema';

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
				<Field label="Nome completo" error={form.formState.errors.fullName?.message}>
					<Input
						placeholder="Seu nome"
						className="border-white/10 bg-white/5 text-white placeholder:text-white/25"
						{...form.register('fullName')}
					/>
				</Field>

				<Field label="E-mail" error={form.formState.errors.email?.message}>
					<Input
						type="email"
						placeholder="voce@email.com"
						className="border-white/10 bg-white/5 text-white placeholder:text-white/25"
						{...form.register('email')}
					/>
				</Field>

				<Field label="Idade" error={form.formState.errors.age?.message}>
					<Input
						type="number"
						inputMode="numeric"
						placeholder="Ex: 32"
						className="border-white/10 bg-white/5 text-white placeholder:text-white/25"
						{...form.register('age')}
					/>
				</Field>

				<Field label="Esporte ou rotina de atividade" error={form.formState.errors.sportPractice?.message}>
					<Input
						placeholder="Ex: caminhada, academia, corrida"
						className="border-white/10 bg-white/5 text-white placeholder:text-white/25"
						{...form.register('sportPractice')}
					/>
				</Field>
			</div>
		</Card>
	);
}
