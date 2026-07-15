import { UseFormReturn } from 'react-hook-form';

import type { ICheckoutFormInput } from '../../schemas/checkout-schema';
import type { ICheckoutQuoteResponse } from '@/features/commerce/api/commerce-api-types';

import { Card } from '@/components/ui/card';
import { ReviewBlock } from './review-block';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { CheckoutSummary } from '../checkout-summary';

import { ClipboardCheck } from 'lucide-react';

type ReviewStepProps = {
	form: UseFormReturn<ICheckoutFormInput>;
	selection: ICheckoutQuoteResponse;
	isBrazil: boolean;
};

export function ReviewStep({ form, selection, isBrazil }: ReviewStepProps) {
	const values = form.watch();

	return (
		<div className="grid gap-6">
			<Card className="border-white/10 bg-white/4 p-6 text-white">
				<div className="flex items-start gap-4">
					<div className="bg-brand-gold/15 text-brand-gold flex size-10 shrink-0 items-center justify-center rounded-full">
						<ClipboardCheck className="size-5" />
					</div>

					<div>
						<h2 className="text-xl font-medium">Revisão final</h2>

						<p className="mt-2 text-sm leading-6 text-white/45">Confira os dados antes de seguir para o pagamento.</p>
					</div>
				</div>

				<Separator className="my-6 bg-white/10" />

				<div className="grid gap-6 sm:grid-cols-2">
					<ReviewBlock
						title="Comprador"
						items={[
							['Nome', values.fullName || '—'],
							['E-mail', values.email || '—'],
							['Idade', values.age ? String(values.age) : '—'],
							['Atividade', values.sportPractice || '—'],
						]}
					/>

					<ReviewBlock
						title="Entrega"
						items={[
							[isBrazil ? 'CEP' : 'ZIP code', values.postalCode || '—'],
							['Endereço', values.addressLine1 || '—'],
							[isBrazil ? 'Número' : 'Number / Apt', values.number || '—'],
							...(isBrazil ? ([['Bairro', values.district || '—']] as const) : []),
							['Cidade', values.city || '—'],
							[isBrazil ? 'Estado' : 'State', values.state || '—'],
						]}
					/>
				</div>

				<Separator className="my-6 bg-white/10" />

				<div className="lg:hidden">
					<CheckoutSummary
						locale={selection.market.locale}
						currency={selection.market.currency}
						selection={selection}
					/>
				</div>
			</Card>

			<Card className="border-white/10 bg-white/4 p-6 text-white">
				<div className="flex items-start gap-3">
					<Checkbox
						id="acceptPrivacy"
						checked={form.watch('acceptPrivacy')}
						onCheckedChange={(checked) => {
							form.setValue('acceptPrivacy', checked === true, {
								shouldValidate: true,
							});
						}}
						className="data-[state=checked]:border-brand-gold data-[state=checked]:bg-brand-gold mt-1 border-white/30"
					/>

					<div>
						<Label htmlFor="acceptPrivacy" className="cursor-pointer text-sm leading-6 text-white/70">
							Li e aceito os Termos de Uso e a Política de Privacidade, autorizando o uso dos dados informados para
							processamento do pedido.
						</Label>

						{form.formState.errors.acceptPrivacy?.message ? (
							<p className="mt-2 text-sm text-red-300">{form.formState.errors.acceptPrivacy.message}</p>
						) : null}
					</div>
				</div>
			</Card>
		</div>
	);
}
