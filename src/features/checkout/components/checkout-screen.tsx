'use client';

import { useForm } from 'react-hook-form';
import { Suspense, useEffect, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';

import type { IMarketCode } from '@/features/commerce/types/commerce';
import {
	checkoutSchema,
	type ICheckoutFormInput,
	type ICheckoutFormData,
} from '@/features/checkout/schemas/checkout-schema';

import { useSessionQuery } from '@/features/auth/hooks/use-auth-queries';
import { useTrackEvent } from '@/features/tracking/hooks/use-track-event';
import { useCartQuery, useSaveCartSelectionMutation } from '@/features/cart/hooks/use-cart-queries';
import {
	useCheckoutQuoteQuery,
	useCreateCheckoutSessionMutation,
} from '@/features/commerce/hooks/use-commerce-queries';

import { Field } from '@/components/field';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckoutOfferEditor } from './checkout-offer-editor';
import { AuthGuard } from '@/features/auth/components/auth-guard';
import { CheckoutSummary } from '@/features/checkout/components/checkout-summary';
import { CheckoutStateMessage } from '@/features/checkout/components/checkout-state-message';

import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function CheckoutScreen() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const { track } = useTrackEvent();
	const sessionQuery = useSessionQuery();

	const user = sessionQuery.data?.session?.user ?? null;

	const cartQuery = useCartQuery(user?.id ?? null);
	const saveCartSelectionMutation = useSaveCartSelectionMutation();

	const cart = cartQuery.data?.cart ?? null;

	const marketParam = searchParams.get('market');
	const offerParam = searchParams.get('offer');
	const bumpParam = searchParams.get('bump');

	const selectedMarketCode: IMarketCode =
		marketParam === 'US' ? 'US' : marketParam === 'BR' ? 'BR' : (cart?.market ?? 'BR');

	const selectedOfferId = offerParam ?? cart?.offerId ?? null;

	const includeOrderBump = offerParam !== null ? bumpParam === '1' : (cart?.includeOrderBump ?? false);

	const quoteInput = useMemo(() => {
		if (!selectedOfferId) {
			return null;
		}

		return {
			market: selectedMarketCode,
			offerId: selectedOfferId,
			includeOrderBump,
		};
	}, [selectedMarketCode, selectedOfferId, includeOrderBump]);

	const quoteQuery = useCheckoutQuoteQuery(quoteInput);
	const createCheckoutSessionMutation = useCreateCheckoutSessionMutation();

	const selection = quoteQuery.data;

	const { watch, handleSubmit, formState, register, setValue } = useForm<
		ICheckoutFormInput,
		unknown,
		ICheckoutFormData
	>({
		resolver: zodResolver(checkoutSchema),
		defaultValues: {
			market: selectedMarketCode,
			fullName: '',
			email: '',
			age: undefined,
			sportPractice: '',
			postalCode: '',
			addressLine1: '',
			number: '',
			addressLine2: '',
			district: '',
			city: '',
			state: '',
			acceptPrivacy: false,
		},
	});

	const acceptPrivacyValue = watch('acceptPrivacy');

	useEffect(() => {
		const user = sessionQuery.data?.session?.user;

		if (!user) {
			return;
		}

		setValue('fullName', user.name, {
			shouldValidate: true,
			shouldDirty: false,
		});

		setValue('email', user.email, {
			shouldValidate: true,
			shouldDirty: false,
		});
	}, [sessionQuery.data?.session?.user]);

	async function onHandleSubmit(data: ICheckoutFormData) {
		if (!quoteInput) {
			return;
		}

		track({
			eventType: 'checkout_submitted',
			market: selectedMarketCode,
			payload: {
				offerId: quoteInput.offerId,
				includeOrderBump: quoteInput.includeOrderBump,
				totalAmount: selection?.summary.totalAmount,
				currency: selection?.summary.currency,
			},
		});

		const result = await createCheckoutSessionMutation.mutateAsync({
			...quoteInput,
			customer: {
				fullName: data.fullName,
				email: data.email,
				age: data.age,
				sportPractice: data.sportPractice,
				postalCode: data.postalCode,
				addressLine1: data.addressLine1,
				number: data.number,
				addressLine2: data.addressLine2,
				district: data.district,
				city: data.city,
				state: data.state,
				acceptPrivacy: data.acceptPrivacy,
			},
		});

		router.push(result.checkoutUrl);
	}

	useEffect(() => {
		if (!user || !offerParam || !quoteInput) {
			return;
		}

		saveCartSelectionMutation.mutate({
			userId: user.id,
			market: quoteInput.market,
			offerId: quoteInput.offerId,
			includeOrderBump: quoteInput.includeOrderBump,
		});
	}, [user?.id, offerParam, quoteInput?.market, quoteInput?.offerId, quoteInput?.includeOrderBump]);

	if (!offerParam) {
		return (
			<CheckoutStateMessage
				title="Oferta não encontrada"
				description="Volte para a página inicial e selecione uma oferta antes de continuar."
				actionLabel="Voltar para a oferta"
				actionHref="/#oferta"
			/>
		);
	}

	if (cartQuery.isLoading && !offerParam) {
		return (
			<CheckoutStateMessage
				title="Carregando seu carrinho"
				description="Estamos buscando a seleção salva na sua sessão."
			/>
		);
	}

	if (quoteQuery.isLoading || !selection) {
		return (
			<CheckoutStateMessage
				title="Preparando seu checkout"
				description="Estamos calculando os valores da sua oferta."
			/>
		);
	}

	if (!selectedOfferId) {
		return (
			<CheckoutStateMessage
				title="Seu carrinho está vazio"
				description="Volte para a oferta e selecione uma opção antes de continuar."
				actionLabel="Voltar para a oferta"
				actionHref="/#oferta"
			/>
		);
	}

	if (quoteQuery.isError) {
		return (
			<CheckoutStateMessage
				title="Não foi possível carregar o checkout"
				description="Tente voltar para a oferta e selecionar novamente."
				actionLabel="Voltar para a oferta"
				actionHref="/#oferta"
			/>
		);
	}

	const locale = selection?.market.locale;
	const currency = selection?.market.currency;
	const isBrazil = selection?.market.code === 'BR';

	return (
		<Suspense fallback={null}>
			<AuthGuard>
				<main className="min-h-svh bg-[#0d0710] px-6 py-8 text-white lg:px-10 lg:py-12">
					<div className="mx-auto max-w-7xl">
						<button
							type="button"
							onClick={() => router.back()}
							className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
						>
							<ArrowLeft className="size-4" />
							Voltar para a oferta
						</button>

						<div className="mt-10 grid gap-10 lg:grid-cols-[1fr_26rem] lg:items-start">
							<section>
								<div>
									<p className="text-brand-gold text-xs font-medium tracking-[0.3em] uppercase">Checkout seguro</p>

									<h1 className="mt-4 text-4xl leading-none font-medium tracking-tighter text-balance sm:text-5xl">
										Complete seus dados para continuar.
									</h1>

									<p className="mt-5 max-w-2xl text-base leading-7 text-white/50">
										Esta é uma versão de demonstração do checkout. Depois, este botão será conectado à API e
										redirecionará para o Stripe.
									</p>
								</div>

								<div className="mt-10">
									<CheckoutOfferEditor
										marketCode={selectedMarketCode}
										selectedOfferId={selectedOfferId}
										includeOrderBump={includeOrderBump}
										userId={user?.id ?? null}
									/>
								</div>

								<form onSubmit={handleSubmit(onHandleSubmit)} className="mt-10 grid gap-8" data-clarity-mask="true">
									<Card className="border-white/10 bg-white/4 p-6 text-white">
										<div className="flex items-start justify-between gap-6">
											<div>
												<h2 className="text-xl font-medium">Dados do comprador</h2>

												<p className="mt-2 text-sm leading-6 text-white/45">
													Usaremos esses dados para identificar o pedido e enviar as próximas informações da compra.
												</p>
											</div>

											<ShieldCheck className="text-brand-gold mt-1 size-5" />
										</div>

										<div className="mt-7 grid gap-5 sm:grid-cols-2">
											<Field label="Nome completo" error={formState.errors.fullName?.message}>
												<Input
													placeholder="Seu nome"
													className="border-white/10 bg-white/5 text-white placeholder:text-white/25"
													{...register('fullName')}
												/>
											</Field>

											<Field label="E-mail" error={formState.errors.email?.message}>
												<Input
													type="email"
													placeholder="voce@email.com"
													className="border-white/10 bg-white/5 text-white placeholder:text-white/25"
													{...register('email')}
												/>
											</Field>

											<Field label="Idade" error={formState.errors.age?.message}>
												<Input
													type="number"
													inputMode="numeric"
													placeholder="Ex: 32"
													className="border-white/10 bg-white/5 text-white placeholder:text-white/25"
													{...register('age')}
												/>
											</Field>

											<Field label="Esporte ou rotina de atividade" error={formState.errors.sportPractice?.message}>
												<Input
													placeholder="Ex: caminhada, academia, corrida"
													className="border-white/10 bg-white/5 text-white placeholder:text-white/25"
													{...register('sportPractice')}
												/>
											</Field>
										</div>
									</Card>

									<Card className="border-white/10 bg-white/4 p-6 text-white">
										<h2 className="text-xl font-medium">Endereço de entrega</h2>

										<p className="mt-2 text-sm leading-6 text-white/45">
											Mercado selecionado: <span className="font-medium text-white">{selection.market.label}</span>
										</p>

										<div className="mt-7 grid gap-5 sm:grid-cols-2">
											<Field label={isBrazil ? 'CEP' : 'ZIP code'} error={formState.errors.postalCode?.message}>
												<Input
													placeholder={isBrazil ? '00000-000' : '00000'}
													className="border-white/10 bg-white/5 text-white placeholder:text-white/25"
													{...register('postalCode')}
												/>
											</Field>

											<Field label={isBrazil ? 'Estado' : 'State'} error={formState.errors.state?.message}>
												<Input
													placeholder={isBrazil ? 'AM' : 'FL'}
													className="border-white/10 bg-white/5 text-white placeholder:text-white/25"
													{...register('state')}
												/>
											</Field>

											<Field
												label={isBrazil ? 'Endereço' : 'Address line 1'}
												error={formState.errors.addressLine1?.message}
												className="sm:col-span-2"
											>
												<Input
													placeholder={isBrazil ? 'Rua, avenida ou logradouro' : 'Street address'}
													className="border-white/10 bg-white/5 text-white placeholder:text-white/25"
													{...register('addressLine1')}
												/>
											</Field>

											<Field label={isBrazil ? 'Número' : 'Number / Apt'} error={formState.errors.number?.message}>
												<Input
													placeholder={isBrazil ? '123' : 'Apt 203'}
													className="border-white/10 bg-white/5 text-white placeholder:text-white/25"
													{...register('number')}
												/>
											</Field>

											<Field label="Complemento" error={formState.errors.addressLine2?.message}>
												<Input
													placeholder="Opcional"
													className="border-white/10 bg-white/5 text-white placeholder:text-white/25"
													{...register('addressLine2')}
												/>
											</Field>

											{isBrazil ? (
												<Field label="Bairro" error={formState.errors.district?.message}>
													<Input
														placeholder="Nome do bairro"
														className="border-white/10 bg-white/5 text-white placeholder:text-white/25"
														{...register('district')}
													/>
												</Field>
											) : null}

											<Field
												label={isBrazil ? 'Cidade' : 'City'}
												error={formState.errors.city?.message}
												className={isBrazil ? undefined : 'sm:col-span-2'}
											>
												<Input
													placeholder={isBrazil ? 'Manaus' : 'Miami'}
													className="border-white/10 bg-white/5 text-white placeholder:text-white/25"
													{...register('city')}
												/>
											</Field>
										</div>
									</Card>

									<Card className="border-white/10 bg-white/4 p-6 text-white">
										<div className="flex items-start gap-3">
											<Checkbox
												id="acceptPrivacy"
												checked={acceptPrivacyValue}
												onCheckedChange={(checked) => {
													setValue('acceptPrivacy', checked === true, {
														shouldValidate: true,
													});
												}}
												className="data-[state=checked]:border-brand-gold data-[state=checked]:bg-brand-gold mt-1 border-white/30"
											/>

											<div>
												<Label htmlFor="acceptPrivacy" className="cursor-pointer text-sm leading-6 text-white/70">
													Li e aceito os Termos de Uso e a Política de Privacidade, autorizando o uso dos dados
													informados para processamento do pedido.
												</Label>

												{formState.errors.acceptPrivacy?.message ? (
													<p className="mt-2 text-sm text-red-300">{formState.errors.acceptPrivacy.message}</p>
												) : null}
											</div>
										</div>
									</Card>

									<div className="lg:hidden">
										<CheckoutSummary locale={locale} currency={currency} selection={selection} />
									</div>

									{createCheckoutSessionMutation.isError ? (
										<p className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
											Não foi possível iniciar o pagamento. Revise os dados e tente novamente.
										</p>
									) : null}

									<Button
										type="submit"
										size="lg"
										disabled={createCheckoutSessionMutation.isPending}
										className="rounded-full bg-[#f5efe4] text-[#16091f] hover:bg-white"
									>
										{createCheckoutSessionMutation.isPending ? 'Preparando pagamento...' : 'Continuar para pagamento'}
									</Button>
								</form>
							</section>

							<aside className="hidden lg:sticky lg:top-8 lg:block">
								<CheckoutSummary locale={locale} currency={currency} selection={selection} />
							</aside>
						</div>
					</div>
				</main>
			</AuthGuard>
		</Suspense>
	);
}
