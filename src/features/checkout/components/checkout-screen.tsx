'use client';

import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type FieldPath } from 'react-hook-form';

import { checkoutSchema, type ICheckoutFormData, type ICheckoutFormInput } from '../schemas/checkout-schema';

import { phoneFormatter } from '@/utils/phone-formatter';
import { useCheckoutDraft } from '../hooks/use-checkout-draft';
import { birthdayFormatter } from '@/utils/birthday-formatter';
import { useAuthSession } from '@/features/auth/hooks/use-auth-session';
import { useSessionQuery } from '@/features/auth/hooks/use-auth-queries';
import { useTrackEvent } from '@/features/tracking/hooks/use-track-event';
import { useGetActiveCartQuery } from '@/features/cart/hooks/use-cart-queries';
import { CheckoutStepper, type CheckoutStep } from './checkout-stepper/checkout-stepper';
import { useCheckoutQuoteQuery, useCreateCheckoutSessionMutation } from '../hooks/use-checkout-queries';

import { ReviewStep } from './checkout-stepper/review-step';
import { CheckoutSummaryCard } from './checkout-summary-card';
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

	const [currentStepIndex, setCurrentStepIndex] = useState(0);

	const { isAuthenticated } = useAuthSession();
	const sessionQuery = useSessionQuery();

	const user = sessionQuery.data?.session?.user ?? null;

	const activeCartQuery = useGetActiveCartQuery({
		enabled: isAuthenticated,
	});

	const cart = activeCartQuery.data?.cart ?? null;
	const cartHasItems = Boolean(cart && cart.items.length > 0);

	const quoteQuery = useCheckoutQuoteQuery({
		enabled: isAuthenticated && cartHasItems,
	});

	const quote = quoteQuery.data?.quote ?? null;

	const createCheckoutSessionMutation = useCreateCheckoutSessionMutation();

	const { track } = useTrackEvent();

	const form = useForm<ICheckoutFormInput, unknown, ICheckoutFormData>({
		resolver: zodResolver(checkoutSchema),
		mode: 'onTouched',
		defaultValues: {
			market: 'BR',
			fullName: '',
			email: '',
			birthDate: '',
			phone: '',
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
		if (!user) {
			return;
		}

		if (!form.getValues('fullName')) {
			form.setValue('fullName', user.name, {
				shouldValidate: true,
				shouldDirty: false,
			});
		}

		if (!form.getValues('email')) {
			form.setValue('email', user.email, {
				shouldValidate: true,
				shouldDirty: false,
			});
		}

		if (!form.getValues('birthDate') && user.profile?.birth_date) {
			form.setValue('birthDate', birthdayFormatter(user.profile.birth_date), {
				shouldValidate: true,
				shouldDirty: false,
			});
		}

		if (!form.getValues('phone') && user.profile?.phone) {
			form.setValue('phone', phoneFormatter(user.profile.phone), {
				shouldValidate: true,
				shouldDirty: false,
			});
		}
	}, [user, form]);

	useEffect(() => {
		const marketCode = quote?.market_code ?? cart?.market_code;

		if (!marketCode) {
			return;
		}

		form.setValue('market', marketCode, {
			shouldValidate: true,
			shouldDirty: false,
		});
	}, [quote?.market_code, cart?.market_code, form]);

	if (activeCartQuery.isLoading) {
		return (
			<CheckoutStateMessage
				title="Carregando seu carrinho"
				description="Estamos buscando os itens salvos na sua conta."
			/>
		);
	}

	if (activeCartQuery.isError) {
		return (
			<CheckoutStateMessage
				title="Não foi possível carregar seu carrinho"
				description="Tente novamente ou volte para selecionar uma oferta."
				actionLabel="Voltar para a oferta"
				actionHref="/#oferta"
			/>
		);
	}

	if (!cart || cart.items.length === 0) {
		return (
			<CheckoutStateMessage
				title="Seu carrinho está vazio"
				description="Volte para a oferta e selecione uma opção antes de continuar."
				actionLabel="Voltar para a oferta"
				actionHref="/#oferta"
			/>
		);
	}

	if (quoteQuery.isLoading || !quote) {
		return (
			<CheckoutStateMessage
				title="Preparando seu checkout"
				description="Estamos validando seu carrinho e calculando os valores do pedido."
			/>
		);
	}

	if (quoteQuery.isError) {
		return (
			<CheckoutStateMessage
				title="Não foi possível calcular o pedido"
				description="Revise seu carrinho ou tente novamente."
				actionHref="/#oferta"
				actionLabel="Voltar para as ofertas"
			/>
		);
	}

	const isBrazil = quote.market_code === 'BR';
	const currentStep = checkoutSteps[currentStepIndex];

	const selectedOfferItem = cart.items.find((item) => {
		return item.type === 'OFFER' && item.offer;
	});

	const selectedOrderBumpItem = cart.items.find((item) => {
		return item.type === 'ORDER_BUMP' && item.order_bump;
	});

	const selectedOfferId = selectedOfferItem?.offer?.id ?? null;
	const includeOrderBump = Boolean(selectedOrderBumpItem);

	/*
	 * O formulário não é enviado para a API, porque o endpoint atual POST /checkout/sessions cria o pedido somente a partir do carrinho ativo.
	 * Quando entrarmos em endereço/cliente no pedido, aí o endpoint pode passar a receber customer e shipping_address */
	async function handleSubmit(_data: ICheckoutFormData) {
		if (!quote) {
			return;
		}

		try {
			track({
				eventType: 'checkout_submitted',
				market: quote.market_code,
				payload: {
					cartId: quote.cart_id,
					totalAmount: quote.summary.total_amount,
					currency: quote.summary.currency,
					itemsCount: quote.items.length,
					hasOrderBump: includeOrderBump,
				},
			});

			const checkoutSessionResult = await createCheckoutSessionMutation.mutateAsync();

			if (checkoutSessionResult.payment_url) {
				window.location.assign(checkoutSessionResult.payment_url);
				return;
			}

			router.push(`/checkout/pending?order_id=${checkoutSessionResult.order_id}`);
		} catch {
			toast.error('Não foi possível criar seu pedido. Tente novamente.');
		}
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
							{currentStep.id === 'offer' && selectedOfferId ? (
								<CheckoutOfferStep
									cart={cart}
									quote={quote}
									selectedOfferId={selectedOfferId}
									includeOrderBump={includeOrderBump}
								/>
							) : null}

							{currentStep.id === 'customer' ? <CustomerStep form={form} /> : null}

							{currentStep.id === 'address' ? <AddressStep form={form} isBrazil={isBrazil} quote={quote} /> : null}

							{currentStep.id === 'review' ? (
								<ReviewStep form={form} quote={quote} cart={cart} isBrazil={isBrazil} />
							) : null}

							{createCheckoutSessionMutation.isError ? (
								<p className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
									Não foi possível criar seu pedido. Revise os dados e tente novamente.
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

					<aside className="lg:sticky lg:top-8 lg:block">
						<CheckoutSummaryCard quote={quote} />
					</aside>
				</div>
			</div>
		</main>
	);
}

function getFieldsForStep(stepId: CheckoutStep['id'], isBrazil: boolean): FieldPath<ICheckoutFormData>[] {
	if (stepId === 'customer') {
		return ['fullName', 'email', 'birthDate', 'phone'];
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
