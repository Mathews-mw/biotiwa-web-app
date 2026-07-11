import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { CheckCircle2 } from 'lucide-react';

type SuccessPageProps = {
	searchParams: Promise<{
		preview?: string;
		order?: string;
	}>;
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
	const params = await searchParams;
	const isPreview = params.preview === '1';

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

				{params.order ? (
					<p className="mt-6 rounded-2xl border border-white/10 bg-white/4 px-5 py-4 font-mono text-xs text-white/45">
						Preview order: {params.order}
					</p>
				) : null}

				<div className="mt-10">
					<Button asChild size="lg" className="rounded-full bg-[#f5efe4] text-[#16091f] hover:bg-white">
						<Link href="/">Voltar para o início</Link>
					</Button>
				</div>
			</section>
		</main>
	);
}
