import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function CheckoutCancelPage() {
	return (
		<main className="flex min-h-svh items-center justify-center bg-[#0d0710] px-6 py-16 text-white">
			<section className="mx-auto max-w-xl text-center">
				<p className="text-brand-gold text-xs font-medium tracking-[0.3em] uppercase">Checkout cancelado</p>

				<h1 className="mt-4 text-4xl leading-none font-medium tracking-tighter text-balance sm:text-5xl">
					O pagamento não foi finalizado.
				</h1>

				<p className="mt-5 text-base leading-7 text-white/55">
					Seu carrinho continua salvo. Você pode voltar ao checkout e tentar novamente quando quiser.
				</p>

				<div className="mt-8 flex justify-center gap-3">
					<Button asChild className="rounded-full bg-[#f5efe4] px-6 text-[#16091f] hover:bg-white">
						<Link href="/checkout">Voltar ao checkout</Link>
					</Button>

					<Button
						asChild
						variant="outline"
						className="rounded-full border-white/10 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
					>
						<Link href="/">Voltar para a loja</Link>
					</Button>
				</div>
			</section>
		</main>
	);
}
