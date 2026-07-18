import Image from 'next/image';

import { FadeIn } from '@/components/motion/fade-in';

import { FileCheck2, MapPin, Microscope } from 'lucide-react';

const scienceItems = [
	{
		title: 'Composição e uso',
		description: 'Espaço destinado às informações técnicas, nutricionais e orientações aprovadas.',
		icon: Microscope,
	},
	{
		title: 'Documentação',
		description: 'Certificações e documentos poderão ser apresentados de maneira organizada.',
		icon: FileCheck2,
	},
	{
		title: 'Origem e fabricação',
		description: 'Informações sobre laboratório, origem e processo de fabricação.',
		icon: MapPin,
	},
] as const;

export function ScienceSection() {
	return (
		<section id="ciencia" className="scroll-mt-24 bg-[#0d0710] px-6 py-28 text-white lg:px-10 lg:py-40">
			<div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-24">
				<FadeIn className="relative min-h-140 overflow-hidden rounded-[2.5rem] border border-white/10">
					<Image
						src="https://images.unsplash.com/photo-1664956618021-73c47736845e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt="Ambiente de laboratório"
						fill
						sizes="(max-width: 1024px) 90vw, 48vw"
						className="object-cover"
					/>

					<div className="absolute inset-0 bg-linear-to-t from-[#0d0710] via-[#0d0710]/20 to-transparent" />

					<div className="absolute inset-x-8 bottom-8 rounded-3xl border border-white/10 bg-black/20 p-6 backdrop-blur-xl sm:inset-x-10 sm:bottom-10">
						<p className="text-brand-gold text-xs tracking-[0.25em] uppercase">Transparência</p>

						<p className="mt-3 max-w-lg text-lg leading-8 text-white/75">
							Toda informação técnica deverá ter origem documentada e aprovação do responsável pelo produto.
						</p>
					</div>
				</FadeIn>

				<div>
					<FadeIn>
						<p className="text-brand-gold text-xs font-medium tracking-[0.3em] uppercase">Ciência e confiança</p>

						<h2 className="mt-6 max-w-xl text-5xl leading-[0.98] font-medium tracking-[-0.055em] text-balance sm:text-6xl">
							Informação também faz parte do produto.
						</h2>

						<p className="mt-7 max-w-xl text-lg leading-8 text-white/55">
							A página poderá reunir conteúdo técnico, documentação, certificações e informações importantes para a
							decisão do consumidor.
						</p>
					</FadeIn>

					<div className="mt-14 divide-y divide-white/10 border-y border-white/10">
						{scienceItems.map((item, index) => {
							const Icon = item.icon;

							return (
								<FadeIn key={item.title} delay={index * 0.08} className="grid grid-cols-[auto_1fr] gap-5 py-7">
									<div className="flex size-11 items-center justify-center rounded-full bg-white/5">
										<Icon className="text-brand-violet size-5" />
									</div>

									<div>
										<h3 className="text-lg font-medium">{item.title}</h3>

										<p className="mt-2 text-sm leading-7 text-white/45">{item.description}</p>
									</div>
								</FadeIn>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
