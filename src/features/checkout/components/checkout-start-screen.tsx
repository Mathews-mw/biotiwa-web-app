'use client';

import { toast } from 'sonner';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import type { ICartSummary } from '@/features/cart/types/cart-entities.types';
import type { IMarketCode } from '@/features/commerce/types/commerce-entity-types';

import { useAuthSession } from '@/features/auth/hooks/use-auth-session';
import { useTrackEvent } from '@/features/tracking/hooks/use-track-event';
import { useAddCartItemMutation, useGetActiveCartQuery } from '@/features/cart/hooks/use-cart-queries';

import { Button } from '@/components/ui/button';

export function CheckoutStartScreen() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [status, setStatus] = useState<'preparing' | 'invalid' | 'error'>('preparing');

	const hasPreparedRef = useRef(false);

	const addCartItemMutation = useAddCartItemMutation();

	const { track } = useTrackEvent();
	const { isAuthenticated } = useAuthSession();

	const activeCartQuery = useGetActiveCartQuery({ enabled: isAuthenticated });

	const checkoutIntent = useMemo(() => {
		const market = searchParams.get('market');
		const offerId = searchParams.get('offer_id');
		const orderBumpId = searchParams.get('order_bump_id');

		if (!isMarketCode(market) || !offerId) {
			return null;
		}

		return {
			marketCode: market,
			offerId,
			orderBumpId,
		};
	}, [searchParams]);

	useEffect(() => {
		if (!checkoutIntent || hasPreparedRef.current) {
			return;
		}

		// SE o usuário estiver autenticado, precisamos ESPERAR a query terminar
		if (isAuthenticated && activeCartQuery.isLoading) {
			return;
		}

		// Indica que possui um carrinho ativo e itens selecionados, então, pula direto para a tela de checkout
		if (activeCartQuery.data?.cart && activeCartQuery.data?.cart.items.length > 0) {
			hasPreparedRef.current = true;
			router.replace('/checkout');
			return;
		}

		async function prepareCheckout(intent: NonNullable<typeof checkoutIntent>) {
			hasPreparedRef.current = true;

			try {
				let cartSummary: ICartSummary | null = null;

				const addOfferResult = await addCartItemMutation.mutateAsync({
					type: 'OFFER',
					marketCode: intent.marketCode,
					offerId: intent.offerId,
					quantity: 1,
				});

				cartSummary = addOfferResult.summary;

				if (intent.orderBumpId) {
					const addOrderBumpResult = await addCartItemMutation.mutateAsync({
						type: 'ORDER_BUMP',
						marketCode: intent.marketCode,
						orderBumpId: intent.orderBumpId,
						quantity: 1,
					});

					cartSummary = addOrderBumpResult.summary;
				}

				if (cartSummary) {
					track({
						eventType: 'checkout_started',
						market: intent.marketCode,
						payload: {
							offerId: intent.offerId,
							includeOrderBump: intent.orderBumpId ? true : false,
							totalAmount: cartSummary.total_amount,
							currency: cartSummary.currency,
						},
					});
				}

				router.replace('/checkout');
			} catch (error) {
				hasPreparedRef.current = false;
				setStatus('error');

				if (error instanceof Error) {
					toast.error(error.message);
				} else {
					toast.error('Não foi possível preparar seu carrinho. Tente novamente.');
				}
			}
		}

		void prepareCheckout(checkoutIntent);
	}, [
		checkoutIntent,
		router,
		addCartItemMutation,
		isAuthenticated,
		activeCartQuery.isLoading,
		activeCartQuery.data?.cart,
	]);

	if (status === 'invalid' || !checkoutIntent) {
		return (
			<CheckoutStartState
				title="Oferta inválida"
				description="Não conseguimos identificar a oferta escolhida."
				actionLabel="Voltar para as ofertas"
				onAction={() => router.replace('/')}
			/>
		);
	}

	if (status === 'error') {
		return (
			<CheckoutStartState
				title="Não foi possível continuar"
				description="Algo deu errado ao preparar seu carrinho."
				actionLabel="Tentar novamente"
				onAction={() => window.location.reload()}
			/>
		);
	}

	return (
		<CheckoutStartState
			title="Preparando seu checkout"
			description="Estamos adicionando os itens escolhidos ao seu carrinho."
		/>
	);
}

type CheckoutStartStateProps = {
	title: string;
	description: string;
	actionLabel?: string;
	onAction?: () => void;
};

function CheckoutStartState({ title, description, actionLabel, onAction }: CheckoutStartStateProps) {
	return (
		<main className="flex min-h-svh items-center justify-center bg-[#0d0710] px-6 py-16 text-white">
			<section className="mx-auto max-w-xl text-center">
				<p className="text-brand-gold text-xs font-medium tracking-[0.3em] uppercase">Açaípulse®</p>

				<h1 className="mt-5 text-4xl font-medium tracking-tighter">{title}</h1>

				<p className="mt-4 text-white/50">{description}</p>

				{actionLabel && onAction && (
					<Button
						type="button"
						onClick={onAction}
						className="mt-8 rounded-full bg-[#f5efe4] px-6 text-[#16091f] hover:bg-white"
					>
						{actionLabel}
					</Button>
				)}
			</section>
		</main>
	);
}

function isMarketCode(value: string | null): value is IMarketCode {
	return value === 'BR' || value === 'US';
}
