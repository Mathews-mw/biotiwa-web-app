'use client';

import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch, type FieldPath } from 'react-hook-form';

import { checkoutSchema, type ICheckoutFormData, type ICheckoutFormInput } from '../schemas/checkout-schema';

import { phoneFormatter } from '@/utils/phone-formatter';
import { useCheckoutDraft } from '../hooks/use-checkout-draft';
import { birthdayFormatter } from '@/utils/birthday-formatter';
import { useAuthSession } from '@/features/auth/hooks/use-auth-session';
import { useSessionQuery } from '@/features/auth/hooks/use-auth-queries';
import { useTrackEvent } from '@/features/tracking/hooks/use-track-event';
import { useGetActiveCartQuery } from '@/features/cart/hooks/use-cart-queries';
import { CheckoutStepper, type CheckoutStep } from './checkout-stepper/checkout-stepper';
import { useCalculateCheckoutSummaryQuery, useCreateCheckoutSessionMutation } from '../hooks/use-checkout-queries';

import { ReviewStep } from './checkout-stepper/review-step';
import { CheckoutSummaryCard } from './checkout-summary-card';
import { AddressStep } from './checkout-stepper/address-step';
import { CheckoutDraftStatus } from './checkout-draft-status';
import { CheckoutStateMessage } from './checkout-state-message';
import { CustomerStep } from './checkout-stepper/customer-step';
import { CheckoutOfferStep } from './checkout-stepper/checkout-offer-step';
import { ShippingStep } from './checkout-stepper/shipping-step/shipping-step';
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
		id: 'shipping',
		title: 'Frete',
		description: 'Cotação do frete',
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
			selectedAddressId: '',
			postalCode: '',
			addressLine1: '',
			number: '',
			addressLine2: '',
			district: '',
			city: '',
			state: '',
			shippingRateId: '',
			acceptPrivacy: false,
		},
	});

	const shippingRateId = useWatch({
		control: form.control,
		name: 'shippingRateId',
	});

	const checkoutSummaryQuery = useCalculateCheckoutSummaryQuery(
		{
			enabled: isAuthenticated && cartHasItems,
		},
		{ cartId: cart?.id, shippingRateId: shippingRateId || undefined }
	);

	const checkoutSummary = checkoutSummaryQuery.data ?? null;

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
		if (!cart?.market_code) {
			return;
		}

		form.setValue('market', cart.market_code, {
			shouldValidate: true,
			shouldDirty: false,
		});
	}, [cart?.market_code, form]);

	if (activeCartQuery.isLoading) {
		return (
			<CheckoutStateMessage
				title="Carregando seu carrinho"
				description="Estamos buscando os itens salvos na sua conta."
			/>
		);
	}

	if (activeCartQuery.isError && !checkoutSummary) {
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

	if (checkoutSummaryQuery.isLoading || !checkoutSummary) {
		return (
			<CheckoutStateMessage
				title="Preparando seu checkout"
				description="Estamos validando seu carrinho e calculando os valores do pedido."
			/>
		);
	}

	if (checkoutSummaryQuery.isPending && !checkoutSummary) {
		// full screen loading
		return <div>Fullscreen loading...</div>;
	}

	if (checkoutSummaryQuery.isError) {
		return (
			<CheckoutStateMessage
				title="Não foi possível calcular o pedido"
				description="Revise seu carrinho ou tente novamente."
				actionHref="/#oferta"
				actionLabel="Voltar para as ofertas"
			/>
		);
	}

	const isBrazil = cart.market_code === 'BR';
	const currentStep = checkoutSteps[currentStepIndex];

	const selectedOfferItem = cart.items.find((item) => {
		return item.type === 'OFFER' && item.offer;
	});

	const selectedOrderBumpItem = cart.items.find((item) => {
		return item.type === 'ORDER_BUMP' && item.order_bump;
	});

	const selectedOfferId = selectedOfferItem?.offer?.id ?? null;
	const includeOrderBump = Boolean(selectedOrderBumpItem);

	async function handleSubmit(data: ICheckoutFormData) {
		if (!cart || !checkoutSummary) {
			return;
		}

		if (!data.shippingRateId) {
			toast.error('Selecione uma opção de entrega.');
			return;
		}

		try {
			track({
				eventType: 'checkout_submitted',
				market: cart.market_code,
				payload: {
					cartId: cart.id,
					totalAmount: checkoutSummary.total_amount,
					currency: checkoutSummary.currency,
					itemsCount: cart.items.length,
					hasOrderBump: includeOrderBump,
				},
			});

			const checkoutSessionResult = await createCheckoutSessionMutation.mutateAsync({
				customer: {
					name: data.fullName,
					email: data.email,
					phone: data.phone,
					document: user?.profile.document ?? undefined,
					birthDate: data.birthDate,
				},
				shippingAddress: {
					zipCode: data.postalCode,
					street: data.addressLine1,
					number: data.number,
					complement: data.addressLine2,
					district: data.district,
					city: data.city,
					state: data.state,
					countryCode: cart.market_code,
				},
				shippingRateId: data.shippingRateId,
			});

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

						<form onSubmit={form.handleSubmit(handleSubmit)} data-clarity-mask="true" className="mt-8 grid gap-8">
							{currentStep.id === 'offer' && selectedOfferId ? (
								<CheckoutOfferStep
									selectedOfferId={selectedOfferId}
									includeOrderBump={includeOrderBump}
									marketCode={cart.market_code}
								/>
							) : null}

							{currentStep.id === 'customer' ? <CustomerStep form={form} /> : null}

							{currentStep.id === 'address' ? (
								<AddressStep userId={user?.id} form={form} marketCode={cart.market_code} />
							) : null}

							{currentStep.id === 'shipping' ? <ShippingStep form={form} /> : null}

							{currentStep.id === 'review' ? (
								<ReviewStep form={form} cart={cart} summary={checkoutSummary} isBrazil={isBrazil} />
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
						<CheckoutSummaryCard summary={checkoutSummary} />
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

	if (stepId === 'shipping') {
		return ['shippingRateId'];
	}

	if (stepId === 'review') {
		return ['acceptPrivacy'];
	}

	return [];
}
