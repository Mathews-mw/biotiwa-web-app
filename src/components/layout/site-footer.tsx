import { navigationItems } from '@/content/landing-page';

export function SiteFooter() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="border-t border-white/10 bg-[#09050b] px-6 py-12 text-white lg:px-10">
			<div className="mx-auto flex max-w-7xl flex-col gap-10">
				<div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
					<div>
						<a href="#top" aria-label="Açaípulse — início" className="text-2xl font-semibold tracking-tighter">
							Açaí
							<span className="text-[#b86bd1]">pulse</span>
							<sup className="ms-0.5 text-[0.4em] font-normal">®</sup>
						</a>

						<p className="mt-4 max-w-sm text-sm leading-7 text-white/40">
							Uma experiência digital criada para apresentar produto, origem e informação.
						</p>
					</div>

					<nav aria-label="Navegação do rodapé" className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm sm:grid-cols-3">
						{navigationItems.map((item) => (
							<a key={item.href} href={item.href} className="text-white/45 transition-colors hover:text-white">
								{item.label}
							</a>
						))}
					</nav>
				</div>

				<div className="flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/30 sm:flex-row">
					<p>© {currentYear} Açaípulse®. Todos os direitos reservados.</p>

					<p>Biotiwa · Amazon Labs</p>
				</div>
			</div>
		</footer>
	);
}
