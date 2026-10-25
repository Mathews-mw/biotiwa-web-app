'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

import { Button } from '@/components/ui/button';

import { BadgePercent, ChartNoAxesCombined, Link2 } from 'lucide-react';

const affiliateBenefits = [
	{
		icon: Link2,
		title: 'Seu código e link',
		description: 'Compartilhe seu código ou link personalizado com sua audiência e clientes.',
	},
	{
		icon: BadgePercent,
		title: 'Benefício para quem compra',
		description: 'Seus clientes podem receber descontos ao comprar utilizando seu código.',
	},
	{
		icon: ChartNoAxesCombined,
		title: 'Acompanhe seus resultados',
		description: 'Veja suas vendas, comissões e códigos diretamente pelo seu painel.',
	},
];

export function ClubSection() {
	return (
		<section id="biotiwa-club" className="border-y border-[#1b0d21]/15 bg-[#efe6d9] py-20 text-[#1b0d21] sm:py-24">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="overflow-hidden rounded-3xl border border-white/10 bg-white/4">
					<div className="grid gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-16">
						<motion.div
							initial={{
								opacity: 0,
								y: 24,
							}}
							whileInView={{
								opacity: 1,
								y: 0,
							}}
							viewport={{
								once: true,
								amount: 0.3,
							}}
							transition={{
								duration: 0.5,
							}}
						>
							<p className="text-brand-acai mb-3 text-sm font-medium tracking-[0.2em]">CLUBE BIOTIWA</p>

							<h2 className="max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
								Compartilhe o Açaípulse e seja recompensado por isso.
							</h2>

							<p className="mt-5 max-w-xl text-base leading-7 text-[#1b0d21]/60 sm:text-lg">
								Acreditamos que boas parcerias nascem de propósitos em comum. Se a sua marca também valoriza saúde,
								bem-estar, natureza e escolhas mais conscientes, podemos construir uma parceria que faça sentido para os
								dois lados.
							</p>

							<div className="mt-8 flex flex-col gap-3 sm:flex-row">
								<Button asChild size="lg">
									<Link href="/biotiwa-club">Seja nosso parceiro</Link>
								</Button>

								<Button asChild size="lg" variant="outline">
									<Link href="/affiliate">Já sou afiliado</Link>
								</Button>
							</div>
						</motion.div>

						<div className="grid gap-4">
							{affiliateBenefits.map((benefit, index) => {
								const Icon = benefit.icon;

								return (
									<motion.div
										key={benefit.title}
										initial={{
											opacity: 0,
											x: 20,
										}}
										whileInView={{
											opacity: 1,
											x: 0,
										}}
										viewport={{
											once: true,
										}}
										transition={{
											duration: 0.4,
											delay: index * 0.08,
										}}
										className="flex gap-4 rounded-2xl border border-[#1b0d21]/15 p-5"
									>
										<div className="bg-brand-acai/10 flex size-11 shrink-0 items-center justify-center rounded-xl border border-[#1b0d21]/15">
											<Icon className="text-brand-violet size-5" />
										</div>

										<div>
											<h3 className="font-medium">{benefit.title}</h3>

											<p className="mt-1 text-sm leading-6 text-[#1b0d21]/60">{benefit.description}</p>
										</div>
									</motion.div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
