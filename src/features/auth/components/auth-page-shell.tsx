import Link from 'next/link';
import type { ReactNode } from 'react';

type AuthPageShellProps = {
	title: string;
	description: string;
	children: ReactNode;
};

export function AuthPageShell({ title, description, children }: AuthPageShellProps) {
	return (
		<main className="min-h-svh bg-[#0d0710] px-6 py-10 text-white lg:px-10">
			<div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
				<section>
					<Link href="/" className="text-sm text-white/45 transition-colors hover:text-white">
						← Voltar para o início
					</Link>

					<p className="text-brand-gold mt-14 text-xs font-medium tracking-[0.3em] uppercase">Açaípulse®</p>

					<h1 className="mt-5 max-w-xl text-5xl leading-none font-medium tracking-[-0.055em] text-balance sm:text-6xl">
						{title}
					</h1>

					<p className="mt-6 max-w-lg text-lg leading-8 text-white/50">{description}</p>
				</section>

				<section>{children}</section>
			</div>
		</main>
	);
}
