import Image from 'next/image';

import { cn } from '@/lib/utils';

import { FadeIn } from '@/components/motion/fade-in';
import { buttonVariants } from '@/components/ui/button';

import { ArrowRight, Globe2, PackageCheck, ShieldCheck } from 'lucide-react';

const productFacts = [
	{
		title: '60 cápsulas',
		description: 'Apresentação prevista para o produto inicial.',
		icon: PackageCheck,
	},
	{
		title: 'Brasil e Estados Unidos',
		description: 'Mercados previstos para a primeira fase.',
		icon: Globe2,
	},
	{
		title: 'Informações verificáveis',
		description: 'Conteúdo técnico sujeito à aprovação do cliente.',
		icon: ShieldCheck,
	},
] as const;

export function ProductDetailsSection() {
	return (
		<section
			id="produto"
			className="scroll-mt-24 overflow-hidden bg-[#efe6d9] px-6 py-28 text-[#1b0d21] lg:px-10 lg:py-40"
		>
			<div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
				<FadeIn className="relative mx-auto aspect-4/5 w-full max-w-lg">
					<div className="bg-brand-acai/15 absolute inset-[10%] rounded-full blur-[90px]" />

					<div className="absolute inset-0 rounded-[3rem] border border-[#1b0d21]/10 bg-white/30" />

					<Image
						src="/images/product/acaipulse-bottle.png"
						alt="Embalagem do Açaípulse com 60 cápsulas"
						fill
						sizes="(max-width: 1024px) 85vw, 40vw"
						className="object-contain p-10 drop-shadow-[0_38px_35px_rgba(41,15,48,0.25)]"
					/>
				</FadeIn>

				<div>
					<FadeIn>
						<p className="text-brand-acai text-xs font-semibold tracking-[0.3em] uppercase">Açaípulse®</p>

						<h2 className="mt-6 text-5xl leading-[0.96] font-medium tracking-[-0.06em] text-balance sm:text-6xl lg:text-7xl">
							Conheça cada detalhe.
						</h2>

						<p className="mt-7 max-w-xl text-lg leading-8 text-[#1b0d21]/60">
							A futura página comercial reunirá composição, modo de uso, documentação, informações nutricionais e
							disponibilidade.
						</p>
					</FadeIn>

					<div className="mt-12 divide-y divide-[#1b0d21]/15 border-y border-[#1b0d21]/15">
						{productFacts.map((fact, index) => {
							const Icon = fact.icon;

							return (
								<FadeIn
									key={fact.title}
									delay={index * 0.08}
									className="grid grid-cols-[auto_1fr] items-start gap-5 py-6"
								>
									<Icon className="text-brand-acai mt-1 size-5" />

									<div>
										<h3 className="font-medium">{fact.title}</h3>
										<p className="mt-1 text-sm leading-6 text-[#1b0d21]/50">{fact.description}</p>
									</div>
								</FadeIn>
							);
						})}
					</div>

					<FadeIn delay={0.25} className="mt-10 flex flex-col gap-4 sm:flex-row">
						<a
							href="#contato"
							className={cn(
								buttonVariants({
									size: 'lg',
								}),
								'rounded-full bg-[#31113b] px-7 text-white hover:bg-[#4a1a58]'
							)}
						>
							Quero saber mais
							<ArrowRight data-icon="inline-end" className="size-4" />
						</a>

						<a
							href="#faq"
							className={cn(
								buttonVariants({
									variant: 'outline',
									size: 'lg',
								}),
								'rounded-full border-[#1b0d21]/20 bg-transparent px-7 text-[#1b0d21] hover:bg-[#1b0d21]/5'
							)}
						>
							Ver informações
						</a>
					</FadeIn>
				</div>
			</div>
		</section>
	);
}
