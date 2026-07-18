'use client';

import { useEffect, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type FieldPath } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';

import type { IMarketCode } from '@/features/commerce/types/commerce';
import { checkoutSchema, type ICheckoutFormData, type ICheckoutFormInput } from '../schemas/checkout-schema';

import { useCheckoutDraft } from '../hooks/use-checkout-draft';
import { useSessionQuery } from '@/features/auth/hooks/use-auth-queries';
import { useTrackEvent } from '@/features/tracking/hooks/use-track-event';
import { CheckoutStepper, type CheckoutStep } from './checkout-stepper/checkout-stepper';
import { useCartQuery, useSaveCartSelectionMutation } from '@/features/cart/hooks/use-cart-queries';
import {
	useCheckoutQuoteQuery,
	useCreateCheckoutSessionMutation,
} from '@/features/commerce/hooks/use-commerce-queries';

import { CheckoutSummary } from './checkout-summary';
import { ReviewStep } from './checkout-stepper/review-step';
import { AddressStep } from './checkout-stepper/address-step';
import { CheckoutDraftStatus } from './checkout-draft-status';
import { CheckoutStateMessage } from './checkout-state-message';
import { CustomerStep } from './checkout-stepper/customer-step';
import { CheckoutOfferStep } from './checkout-stepper/checkout-offer-step';
import { CheckoutStepActions } from './checkout-stepper/checkout-step-actions';

import { ArrowLeft } from 'lucide-react';

const checkoutSteps: CheckoutStep[] = [
	{
		id: 'offer',
		title: 'Oferta',
		description: 'Revise plano e adicional.',
	},
	{
		id: 'customer',
		title: 'Dados',
		description: 'Identificação do comprador.',
	},
	{
		id: 'address',
		title: 'Entrega',
		description: 'Endereço de envio.',
	},
	{
		id: 'review',
		title: 'Revisão',
		description: 'Confirme tudo antes de pagar.',
	},
];

export function CheckoutScreen() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const marketParam = searchParams.get('market');
	const offerParam = searchParams.get('offer');
	const bumpParam = searchParams.get('bump');

	const [currentStepIndex, setCurrentStepIndex] = useState(0);

	const sessionQuery = useSessionQuery();
	const user = sessionQuery.data?.session?.user ?? null;

	const cartQuery = useCartQuery(user?.id ?? null);
	const saveCartSelectionMutation = useSaveCartSelectionMutation();

	const cart = cartQuery.data?.cart ?? null;

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
	const { track } = useTrackEvent();

	const selection = quoteQuery.data;

	const form = useForm<ICheckoutFormInput, unknown, ICheckoutFormData>({
		resolver: zodResolver(checkoutSchema),
		mode: 'onTouched',
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

	const checkoutDraft = useCheckoutDraft({
		form,
		userId: user?.id ?? null,
		enabled: Boolean(user),
	});

	useEffect(() => {
		const currentUser = sessionQuery.data?.session?.user;

		if (!currentUser) {
			return;
		}

		if (!form.getValues('fullName')) {
			form.setValue('fullName', currentUser.name, {
				shouldValidate: true,
				shouldDirty: false,
			});
		}

		if (!form.getValues('email')) {
			form.setValue('email', currentUser.email, {
				shouldValidate: true,
				shouldDirty: false,
			});
		}
	}, [sessionQuery.data?.session?.user, form]);

	useEffect(() => {
		form.setValue('market', selectedMarketCode);
	}, [selectedMarketCode, form]);

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

	if (cartQuery.isLoading && !offerParam) {
		return (
			<CheckoutStateMessage
				title="Carregando seu carrinho"
				description="Estamos buscando a seleção salva na sua sessão."
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

	if (quoteQuery.isLoading || !selection) {
		return (
			<CheckoutStateMessage
				title="Preparando seu checkout"
				description="Estamos calculando os valores da sua oferta."
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

	const locale = selection.market.locale;
	const currency = selection.market.currency;
	const isBrazil = selection.market.code === 'BR';
	const currentStep = checkoutSteps[currentStepIndex];

	async function handleSubmit(data: ICheckoutFormData) {
		if (!quoteInput || !selection) {
			return;
		}

		track({
			eventType: 'checkout_submitted',
			market: selectedMarketCode,
			payload: {
				offerId: quoteInput.offerId,
				includeOrderBump: quoteInput.includeOrderBump,
				totalAmount: selection.summary.totalAmount,
				currency: selection.summary.currency,
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

	async function handleNextStep() {
		const fieldsToValidate = getFieldsForStep(currentStep.id, isBrazil);

		if (fieldsToValidate.length > 0) {
			const isValid = await form.trigger(fieldsToValidate, {
				shouldFocus: true,
			});

			if (!isValid) {
				return;
			}
		}

		setCurrentStepIndex((current) => {
			return Math.min(current + 1, checkoutSteps.length - 1);
		});

		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}

	function handlePreviousStep() {
		setCurrentStepIndex((current) => {
			return Math.max(current - 1, 0);
		});

		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}

	return (
		<main className="min-h-svh bg-[#0d0710] px-6 py-8 text-white lg:px-10 lg:py-12">
			<div className="mx-auto max-w-7xl">
				<button
					type="button"
					onClick={() => router.back()}
					className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
				>
					<ArrowLeft className="size-4" />
					Voltar
				</button>

				<div className="mt-10 grid gap-10 lg:grid-cols-[1fr_26rem] lg:items-start">
					<section>
						<div>
							<p className="text-brand-gold text-xs font-medium tracking-[0.3em] uppercase">Checkout seguro</p>

							<h1 className="mt-4 text-4xl leading-none font-medium tracking-tighter text-balance sm:text-5xl">
								Finalize sua compra em poucos passos.
							</h1>

							<p className="mt-5 max-w-2xl text-base leading-7 text-white/50">
								Revise sua oferta, confirme seus dados e siga para o pagamento seguro.
							</p>
						</div>

						<div className="mt-10">
							<CheckoutStepper steps={checkoutSteps} currentStepIndex={currentStepIndex} />

							<CheckoutDraftStatus
								hasDraft={checkoutDraft.hasDraft}
								lastSavedAt={checkoutDraft.lastSavedAt}
								onClear={checkoutDraft.clearDraft}
							/>
						</div>

						<form onSubmit={form.handleSubmit(handleSubmit)} className="mt-8 grid gap-8" data-clarity-mask="true">
							{currentStep.id === 'offer' ? (
								<CheckoutOfferStep
									marketCode={selectedMarketCode}
									selectedOfferId={selectedOfferId}
									includeOrderBump={includeOrderBump}
									userId={user?.id ?? null}
								/>
							) : null}

							{currentStep.id === 'customer' ? <CustomerStep form={form} /> : null}

							{currentStep.id === 'address' ? (
								<AddressStep form={form} isBrazil={isBrazil} selection={selection} />
							) : null}

							{currentStep.id === 'review' ? (
								<ReviewStep form={form} selection={selection} isBrazil={isBrazil} />
							) : null}

							{createCheckoutSessionMutation.isError ? (
								<p className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
									Não foi possível iniciar o pagamento. Revise os dados e tente novamente.
								</p>
							) : null}

							<CheckoutStepActions
								currentStepIndex={currentStepIndex}
								totalSteps={checkoutSteps.length}
								isSubmitting={createCheckoutSessionMutation.isPending}
								onPrevious={handlePreviousStep}
								onNext={handleNextStep}
							/>
						</form>
					</section>

					<aside className="hidden lg:sticky lg:top-8 lg:block">
						<CheckoutSummary locale={locale} currency={currency} selection={selection} />
					</aside>
				</div>
			</div>
		</main>
	);
}

function getFieldsForStep(stepId: CheckoutStep['id'], isBrazil: boolean): FieldPath<ICheckoutFormData>[] {
	if (stepId === 'customer') {
		return ['fullName', 'email', 'age', 'sportPractice'];
	}

	if (stepId === 'address') {
		return isBrazil
			? ['postalCode', 'addressLine1', 'number', 'district', 'city', 'state']
			: ['postalCode', 'addressLine1', 'city', 'state'];
	}

	if (stepId === 'review') {
		return ['acceptPrivacy'];
	}

	return [];
}
