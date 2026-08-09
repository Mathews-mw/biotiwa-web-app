import { Suspense } from 'react';

import { AuthGuard } from '@/features/auth/components/auth-guard';
import { CheckoutStartScreen } from '@/features/checkout/components/checkout-start-screen';

export default function CheckoutStartPage() {
	return (
		<Suspense fallback={<CheckoutStartFallback />}>
			<AuthGuard>
				<CheckoutStartScreen />
			</AuthGuard>
		</Suspense>
	);
}

function CheckoutStartFallback() {
	return (
		<main className="flex min-h-svh items-center justify-center bg-[#0d0710] px-6 py-16 text-white">
			<section className="mx-auto max-w-xl text-center">
				<p className="text-brand-gold text-xs font-medium tracking-[0.3em] uppercase">Açaípulse®</p>

				<h1 className="mt-5 text-4xl font-medium tracking-tighter">Preparando seu checkout</h1>

				<p className="mt-4 text-white/50">Estamos organizando os itens escolhidos.</p>
			</section>
		</main>
	);
}
