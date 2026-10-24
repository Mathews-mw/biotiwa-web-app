'use client';

import { toast } from 'sonner';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type { IAffiliatePromotionCodeSettings } from '../types/affiliate.types';
import type { IMarketCode } from '@/features/commerce/types/commerce-entity-types';

import { priceFormatter } from '@/utils/price-formatter';
import { formatBasisPoints } from '@/features/promotion/helpers/format-basis';
import { useCreateAffiliatePromotionCodeMutation } from '../hooks/use-affiliate-queries';
import {
	createOwnAffiliatePromotionCodeFormSchema,
	type ICreateOwnAffiliatePromotionCodeFormInput,
} from '../actions/form-schemas/create-own-affiliate-promotion-code-schema';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ErrorMessage } from '@/components/error-message';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import { Loader2, Plus } from 'lucide-react';

interface Props {
	marketCode: IMarketCode;
	affiliatePromotionCodeSettings: IAffiliatePromotionCodeSettings;
}

export function CreateAffiliatePromotionCodeDialog({ marketCode, affiliatePromotionCodeSettings }: Props) {
	const [open, setOpen] = useState(false);

	const mutation = useCreateAffiliatePromotionCodeMutation(marketCode);

	const { enabled, active_codes, settings } = affiliatePromotionCodeSettings;

	const form = useForm<ICreateOwnAffiliatePromotionCodeFormInput>({
		resolver: zodResolver(createOwnAffiliatePromotionCodeFormSchema),
		defaultValues: {
			marketCode,
			code: '',
			expiresInDays: settings.min_code_lifetime_days,
			maxUsesPerCustomer: 1,
		},
	});

	const canCreate = enabled && active_codes < settings.max_active_codes_per_affiliate;

	async function handleCreatePromotionCode(data: ICreateOwnAffiliatePromotionCodeFormInput) {
		const result = await mutation.mutateAsync({
			marketCode: data.marketCode,
			code: data.code.trim().toUpperCase(),
			expiresInDays: data.expiresInDays,
			maxUsesPerCustomer: data.maxUsesPerCustomer,
		});

		if (!result.success) {
			toast.error(result.message);
			return;
		}

		toast.success(result.message);

		form.reset();

		setOpen(false);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button disabled={!canCreate}>
					<Plus />
					Criar código
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle>Criar código de afiliado</DialogTitle>

					<DialogDescription>Crie um código personalizado para compartilhar com seus clientes.</DialogDescription>
				</DialogHeader>

				<form
					id="create-promotion-code-form"
					className="space-y-5"
					onSubmit={form.handleSubmit(handleCreatePromotionCode)}
				>
					<div className="space-y-2">
						<Label htmlFor="code">Código</Label>

						<Input id="code" placeholder="Ex.: MARIA10" {...form.register('code')} />

						{form.formState.errors.code && (
							<p className="text-destructive text-sm">{form.formState.errors.code.message}</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="expiresInDays">Validade em dias</Label>

						<Input
							id="expiresInDays"
							type="number"
							min={settings.min_code_lifetime_days}
							max={settings.max_code_lifetime_days}
							{...form.register('expiresInDays', {
								valueAsNumber: true,
							})}
						/>

						<p className="text-muted-foreground text-xs">
							Entre {settings.min_code_lifetime_days} e {settings.max_code_lifetime_days} dias.
						</p>
					</div>

					<div className="space-y-2">
						<Label htmlFor="maxUsesPerCustomer">Usos por cliente</Label>

						<Input
							id="maxUsesPerCustomer"
							type="number"
							min={1}
							max={settings.max_uses_per_customer_limit}
							{...form.register('maxUsesPerCustomer', {
								valueAsNumber: true,
							})}
						/>

						<p className="text-muted-foreground text-xs">
							Máximo de {settings.max_uses_per_customer_limit} utilizações por cliente.
						</p>
					</div>

					<div className="bg-muted rounded-lg p-4 text-sm">
						<p>
							Desconto para seus clientes:{' '}
							<strong>
								{settings.default_affiliate_discount_type === 'PERCENTAGE'
									? formatBasisPoints(settings.default_affiliate_discount_value)
									: priceFormatter({
										value: settings.default_affiliate_discount_value,
										currency: marketCode === 'BR' ? 'BRL' : 'USD',
									})}
							</strong>
						</p>

						<p className="mt-1">
							Sua comissão: <strong>{formatBasisPoints(settings.default_affiliate_commission_rate)}</strong>
						</p>
					</div>

					{mutation.isError && <ErrorMessage message={mutation.error.message} />}

					<div className="flex w-full justify-end gap-2">
						<Button type="submit" form="create-promotion-code-form" disabled={mutation.isPending}>
							{mutation.isPending && <Loader2 className="animate-spin" />}
							{mutation.isPending ? 'Criando...' : 'Criar código'}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
