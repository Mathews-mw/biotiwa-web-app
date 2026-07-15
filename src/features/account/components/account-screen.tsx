'use client';

import Link from 'next/link';

import { useSessionQuery } from '@/features/auth/hooks/use-auth-queries';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function AccountScreen() {
	const sessionQuery = useSessionQuery();
	const user = sessionQuery.data?.session?.user;

	return (
		<main className="min-h-svh bg-[#0d0710] px-6 py-10 text-white lg:px-10">
			<section className="mx-auto max-w-3xl">
				<Link href="/" className="text-sm text-white/45 transition-colors hover:text-white">
					← Voltar para o início
				</Link>

				<h1 className="mt-12 text-5xl font-medium tracking-[-0.055em]">Minha conta</h1>

				<p className="mt-4 text-white/50">
					Esta área será expandida depois com histórico de pedidos, endereços, preferências, etc.
				</p>

				<Card className="mt-8 border-white/10 bg-white/4 p-6 text-white">
					<p className="text-sm text-white/45">Nome</p>
					<p className="mt-2 text-lg font-medium">{user?.name}</p>

					<div className="mt-6">
						<p className="text-sm text-white/45">E-mail</p>
						<p className="mt-2 text-lg font-medium">{user?.email}</p>
					</div>
				</Card>

				<Button asChild className="mt-8 rounded-full bg-[#f5efe4] text-[#16091f] hover:bg-white">
					<Link href="/#oferta">Continuar comprando</Link>
				</Button>
			</section>
		</main>
	);
}
