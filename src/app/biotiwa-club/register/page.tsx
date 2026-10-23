'use client';

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useRegisterAffiliateMutation } from '@/features/affiliate/hooks/use-affiliate-queries';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { AuthGuard } from '@/features/auth/components/auth-guard';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AffiliateTermsDialog } from '@/features/affiliate/components/affiliate-terms-dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
	type IRegisterAffiliateFormInput,
	registerAffiliateFormSchema,
} from '@/features/affiliate/actions/form-schemas/register-affiliate-schema';

import { Loader2 } from 'lucide-react';
import { BackButton } from '@/components/back-button';

export default function AffiliateRegisterPage() {
	const {
		control,
		handleSubmit,
		setValue,
		formState: { isSubmitting, errors },
	} = useForm<IRegisterAffiliateFormInput>({
		resolver: zodResolver(registerAffiliateFormSchema),
		defaultValues: {
			type: 'PROMOTER',
			acceptTerms: false,
		},
	});

	const router = useRouter();
	const registerMutation = useRegisterAffiliateMutation();

	const selectedType = useWatch({
		control,
		name: 'type',
	});

	const acceptTerms = useWatch({
		control,
		name: 'acceptTerms',
	});

	async function handleRegisterAffiliate(data: IRegisterAffiliateFormInput) {
		const result = await registerMutation.mutateAsync({ type: data.type, acceptTerms: data.acceptTerms });

		if (!result.success) {
			toast.error(result.message);
			return;
		}

		toast.success(result.message);

		router.replace('/affiliate');
	}

	return (
		<AuthGuard>
			<section className="pt-10">
				<div className="flex w-full justify-between">
					<div className="flex flex-col gap-4">
						<p className="mb-6 font-bold tracking-[0.22em] text-[#d7b56d]">CLUBE BIOTIWA</p>

						<h1 className="text-4xl leading-[0.93] font-medium tracking-[-0.06em] text-balance text-[#1b260d]">
							Faça seu cadastro
						</h1>

						<p className="text-muted-foreground">Cadastre-se para ser um parceiro Biotiwa e fazer parte do clube.</p>
					</div>

					<BackButton />
				</div>
			</section>

			<div className="mx-auto max-w-2xl px-4 py-10">
				<Card>
					<CardHeader>
						<CardTitle>Programa de afiliados</CardTitle>

						<CardDescription>
							Escolha o perfil que melhor representa como você pretende divulgar os produtos.
						</CardDescription>
					</CardHeader>

					<CardContent>
						<form className="space-y-6" onSubmit={handleSubmit(handleRegisterAffiliate)}>
							<RadioGroup
								value={selectedType}
								onValueChange={(value) => {
									setValue('type', value as IRegisterAffiliateFormInput['type'], {
										shouldDirty: true,

										shouldValidate: true,
									});
								}}
								className="grid gap-4 sm:grid-cols-2"
							>
								<Label htmlFor="promoter" className="cursor-pointer rounded-lg border p-5">
									<div className="flex gap-3">
										<RadioGroupItem id="promoter" value="PROMOTER" />

										<div>
											<p className="font-medium">Promotor</p>

											<p className="text-muted-foreground mt-1 text-sm">
												Para quem divulga produtos através de conteúdo, redes sociais ou indicações.
											</p>
										</div>
									</div>
								</Label>

								<Label htmlFor="reseller" className="cursor-pointer rounded-lg border p-5">
									<div className="flex gap-3">
										<RadioGroupItem id="reseller" value="RESELLER" />

										<div>
											<p className="font-medium">Revendedor</p>

											<p className="text-muted-foreground mt-1 text-sm">
												Para quem trabalha diretamente com vendas e indicação de produtos para seus clientes.
											</p>
										</div>
									</div>
								</Label>
							</RadioGroup>

							{registerMutation.isError && (
								<p className="text-destructive text-sm">Não foi possível enviar sua solicitação. Tente novamente.</p>
							)}

							<div className="flex items-start gap-3 p-4">
								<Checkbox
									id="acceptPrivacy"
									checked={acceptTerms}
									onCheckedChange={(checked) => {
										setValue('acceptTerms', checked === true, {
											shouldValidate: true,
										});
									}}
									className="mt-2.5"
								/>

								<div>
									<div className="flex">
										<Label htmlFor="acceptPrivacy" className="text-muted-foreground cursor-pointer text-sm leading-6">
											Li e aceito os termos de
										</Label>
										<AffiliateTermsDialog />
									</div>

									{errors.acceptTerms?.message ? (
										<p className="mt-2 text-sm text-red-500">{errors.acceptTerms.message}</p>
									) : null}
								</div>
							</div>

							<div className="flex justify-end">
								<Button type="submit" disabled={registerMutation.isPending || isSubmitting}>
									{(registerMutation.isPending || isSubmitting) && <Loader2 className="animate-spin" />}
									{registerMutation.isPending ? 'Registrando...' : 'Solicitar participação'}
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</AuthGuard>
	);
}
