'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

import { useCheckoutSessionStatusQuery } from '../hooks/use-checkout-queries';

import { CheckoutResultState } from './checkout-result-state';
import { cartQueryKeys } from '@/features/cart/query-keys/cart-query-keys';

export function CheckoutSuccessScreen() {
	const searchParams = useSearchParams();
	const providerSessionId = searchParams.get('session_id');

	const queryClient = useQueryClient();

	const sessionStatusQuery = useCheckoutSessionStatusQuery({
		providerSessionId,
	});

	useEffect(() => {
		if (!sessionStatusQuery.data?.is_paid) {
			return;
		}

		queryClient.invalidateQueries({
			queryKey: cartQueryKeys.active(),
		});
	}, [sessionStatusQuery.data?.is_paid, queryClient]);

	if (!providerSessionId) {
		return (
			<CheckoutResultState
				variant="error"
				title="Sessão de checkout não encontrada"
				description="Não encontramos o identificador da sessão de pagamento."
				actionLabel="Voltar para a loja"
				actionHref="/"
			/>
		);
	}

	if (sessionStatusQuery.isLoading) {
		return (
			<CheckoutResultState
				variant="pending"
				title="Confirmando seu pagamento"
				description="Estamos verificando o status do seu pedido. Isso pode levar alguns segundos."
			/>
		);
	}

	if (sessionStatusQuery.isError || !sessionStatusQuery.data) {
		return (
			<CheckoutResultState
				variant="error"
				title="Não foi possível consultar seu pedido"
				description="O pagamento pode ter sido processado, mas não conseguimos carregar os detalhes agora."
				actionLabel="Voltar para a loja"
				actionHref="/"
			/>
		);
	}

	const checkoutSession = sessionStatusQuery.data;

	if (checkoutSession.is_pending) {
		return (
			<CheckoutResultState
				variant="pending"
				title="Pagamento em confirmação"
				description="Recebemos o retorno do Stripe e estamos aguardando a confirmação final do pagamento."
				orderId={checkoutSession.order_id}
				amount={checkoutSession.amount}
				currency={checkoutSession.currency}
			/>
		);
	}

	if (checkoutSession.is_failed) {
		return (
			<CheckoutResultState
				variant="error"
				title="Pagamento não aprovado"
				description="Não conseguimos confirmar seu pagamento. Você pode tentar novamente pelo checkout."
				orderId={checkoutSession.order_id}
				amount={checkoutSession.amount}
				currency={checkoutSession.currency}
				actionLabel="Tentar novamente"
				actionHref="/checkout"
			/>
		);
	}

	if (checkoutSession.is_expired) {
		return (
			<CheckoutResultState
				variant="error"
				title="Sessão de pagamento expirada"
				description="A sessão de pagamento expirou. Seu carrinho deve continuar salvo para uma nova tentativa."
				orderId={checkoutSession.order_id}
				amount={checkoutSession.amount}
				currency={checkoutSession.currency}
				actionLabel="Voltar ao checkout"
				actionHref="/checkout"
			/>
		);
	}

	return (
		<CheckoutResultState
			variant="success"
			title="Pagamento confirmado"
			description="Seu pedido foi criado com sucesso. Em breve você receberá novas atualizações."
			orderId={checkoutSession.order_id}
			amount={checkoutSession.amount}
			currency={checkoutSession.currency}
			actionLabel="Voltar para a loja"
			actionHref="/"
			showOrderDetailsButton
		/>
	);
}
