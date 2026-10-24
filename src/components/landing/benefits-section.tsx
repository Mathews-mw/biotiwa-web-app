import { FadeIn } from '@/components/motion/fade-in';

import { Eye, FlaskConical, Leaf, Route } from 'lucide-react';

const benefits = [
	{
		title: 'Identidade amazônica',
		description: 'Uma narrativa visual que valoriza a origem e a identidade do produto.',
		icon: Leaf,
	},
	{
		title: 'Informação transparente',
		description: 'Conteúdo organizado para facilitar o acesso às informações importantes.',
		icon: Eye,
	},
	{
		title: 'Pesquisa e desenvolvimento',
		description: 'Um espaço preparado para explicar formulação, processo e documentação.',
		icon: FlaskConical,
	},
	{
		title: 'Experiência simples',
		description: 'Uma jornada clara desde a apresentação até a futura experiência de compra.',
		icon: Route,
	},
] as const;

export function BenefitsSection() {
	return (
		<section
			id="diferenciais"
			className="scroll-mt-24 border-y border-[#1b0d21]/15 bg-[#efe6d9] px-6 py-28 text-[#1b0d21] lg:px-10 lg:py-40"
		>
			<div className="mx-auto max-w-7xl">
				<FadeIn>
					<p className="text-brand-acai text-xs font-medium tracking-[0.3em] uppercase">Diferenciais</p>

					<div className="mt-6 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
						<h2 className="max-w-3xl text-4xl leading-[1.03] font-medium tracking-tighter text-balance sm:text-5xl lg:text-6xl">
							Uma experiência construída em torno do que importa.
						</h2>

						<p className="max-w-md text-base leading-7 text-[#1b0d21]/60">
							Em vez de sobrecarregar a página com promessas, cada seção apresenta uma parte da história de forma
							objetiva.
						</p>
					</div>
				</FadeIn>

				<div className="mt-20 grid border-t border-[#1b0d21]/15 md:grid-cols-2 lg:grid-cols-4">
					{benefits.map((benefit, index) => {
						const Icon = benefit.icon;

						return (
							<FadeIn
								key={benefit.title}
								delay={index * 0.08}
								className="border-b border-[#1b0d21]/15 py-10 md:px-8 md:odd:border-r lg:border-r lg:border-b-0 lg:first:ps-0 lg:last:border-r-0"
							>
								<div className="bg-brand-acai/10 flex size-11 items-center justify-center rounded-full border border-[#1b0d21]/15">
									<Icon className="text-brand-violet size-5" />
								</div>

								<h3 className="mt-8 text-xl font-medium">{benefit.title}</h3>

								<p className="mt-4 text-sm leading-7 text-[#1b0d21]/60">{benefit.description}</p>
							</FadeIn>
						);
					})}
				</div>
			</div>
		</section>
	);
}
