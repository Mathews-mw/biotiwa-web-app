'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';

export function CheckoutPendingScreen() {
	const searchParams = useSearchParams();
	const orderId = searchParams.get('order_id');

	return (
		<main className="flex min-h-svh items-center justify-center bg-[#0d0710] px-6 py-16 text-white">
			<section className="mx-auto max-w-xl text-center">
				<p className="text-brand-gold text-xs font-medium tracking-[0.3em] uppercase">Pedido criado</p>

				<h1 className="mt-5 text-4xl font-medium tracking-tighter">Seu pedido está pendente de pagamento</h1>

				<p className="mt-4 text-white/55">
					Criamos seu pedido com sucesso. A etapa de pagamento será conectada em breve.
				</p>

				{orderId && (
					<p className="mt-6 rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-white/55">
						Pedido: <span className="text-white">{orderId}</span>
					</p>
				)}

				<div className="mt-8 flex justify-center">
					<Button asChild className="rounded-full bg-[#f5efe4] px-6 text-[#16091f] hover:bg-white">
						<Link href="/">Voltar para a loja</Link>
					</Button>
				</div>
			</section>
		</main>
	);
}
