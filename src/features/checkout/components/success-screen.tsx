'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { useSessionQuery } from '@/features/auth/hooks/use-auth-queries';
import { useClearCartMutation } from '@/features/cart/hooks/use-cart-queries';

import { Button } from '@/components/ui/button';

import { CheckCircle2 } from 'lucide-react';

export function SuccessScreen() {
	const searchParams = useSearchParams();

	const sessionQuery = useSessionQuery();
	const clearCartMutation = useClearCartMutation();

	const isPreview = searchParams.get('preview') === '1';
	const orderId = searchParams.get('order');

	const userId = sessionQuery.data?.session?.user.id;

	useEffect(() => {
		if (!isPreview || !userId) {
			return;
		}

		clearCartMutation.mutate({
			userId,
		});
	}, [isPreview, userId]);

	return (
		<main className="flex min-h-svh items-center bg-[#0d0710] px-6 py-16 text-white">
			<section className="mx-auto max-w-2xl text-center">
				<div className="bg-brand-gold/15 text-brand-gold mx-auto flex size-16 items-center justify-center rounded-full">
					<CheckCircle2 className="size-8" />
				</div>

				<p className="text-brand-gold mt-8 text-xs font-medium tracking-[0.3em] uppercase">
					{isPreview ? 'Preview do fluxo' : 'Pedido recebido'}
				</p>

				<h1 className="mt-5 text-5xl leading-none font-medium tracking-tighter text-balance">
					Obrigado! Seu pedido foi iniciado.
				</h1>

				<p className="mt-6 text-lg leading-8 text-white/55">
					{isPreview
						? 'Esta tela ainda está em modo demonstração. Na versão integrada, o pagamento será confirmado pelo Stripe e o pedido será enviado ao Bling.'
						: 'Recebemos as informações da sua compra e enviaremos os próximos passos por e-mail.'}
				</p>

				{orderId ? (
					<p className="mt-6 rounded-2xl border border-white/10 bg-white/4 px-5 py-4 font-mono text-xs text-white/45">
						Preview order: {orderId}
					</p>
				) : null}

				{clearCartMutation.isPending ? (
					<p className="mt-5 text-sm text-white/40">Limpando carrinho da sessão...</p>
				) : null}

				<div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
					<Button asChild size="lg" className="rounded-full bg-[#f5efe4] text-[#16091f] hover:bg-white">
						<Link href="/">Voltar para o início</Link>
					</Button>

					<Button
						asChild
						size="lg"
						variant="outline"
						className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
					>
						<Link href="/account">Ver minha conta</Link>
					</Button>
				</div>
			</section>
		</main>
	);
}
