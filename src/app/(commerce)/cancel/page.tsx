import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { CircleX } from 'lucide-react';

export default function CancelPage() {
	return (
		<main className="flex min-h-svh items-center bg-[#0d0710] px-6 py-16 text-white">
			<section className="mx-auto max-w-2xl text-center">
				<div className="mx-auto flex size-16 items-center justify-center rounded-full bg-white/10 text-white/60">
					<CircleX className="size-8" />
				</div>

				<p className="text-brand-gold mt-8 text-xs font-medium tracking-[0.3em] uppercase">Pagamento cancelado</p>

				<h1 className="mt-5 text-5xl leading-none font-medium tracking-tighter text-balance">
					Nenhum pagamento foi concluído.
				</h1>

				<p className="mt-6 text-lg leading-8 text-white/55">
					Você pode retornar para a oferta e revisar os dados antes de tentar novamente.
				</p>

				<div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
					<Button asChild size="lg" className="rounded-full bg-[#f5efe4] text-[#16091f] hover:bg-white">
						<Link href="/#oferta">Voltar para oferta</Link>
					</Button>

					<Button
						asChild
						size="lg"
						variant="outline"
						className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
					>
						<Link href="/">Ir para o início</Link>
					</Button>
				</div>
			</section>
		</main>
	);
}
