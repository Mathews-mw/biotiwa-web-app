'use client';

import { motion, useReducedMotion } from 'motion/react';

import { cn } from '@/lib/utils';

import { buttonVariants } from '@/components/ui/button';

import { ArrowRight } from 'lucide-react';

export function FinalCtaSection() {
	const shouldReduceMotion = useReducedMotion();

	return (
		<section id="contato" className="relative overflow-hidden bg-[#6d247d] px-6 py-28 text-white lg:px-10 lg:py-44">
			<motion.div
				aria-hidden="true"
				animate={
					shouldReduceMotion
						? undefined
						: {
							x: [0, 40, 0],
							y: [0, -30, 0],
						}
				}
				transition={{
					duration: 12,
					repeat: Number.POSITIVE_INFINITY,
					ease: 'easeInOut',
				}}
				className="absolute -inset-s-32 -top-32 size-112 rounded-full bg-[#d7b56d]/20 blur-[100px]"
			/>

			<motion.div
				aria-hidden="true"
				animate={
					shouldReduceMotion
						? undefined
						: {
							x: [0, -50, 0],
							y: [0, 35, 0],
						}
				}
				transition={{
					duration: 14,
					repeat: Number.POSITIVE_INFINITY,
					ease: 'easeInOut',
				}}
				className="absolute -inset-e-20 -bottom-40 size-128 rounded-full bg-[#18091e]/35 blur-[110px]"
			/>

			<motion.div
				initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.35 }}
				transition={{
					duration: 0.8,
					ease: [0.22, 1, 0.36, 1],
				}}
				className="relative mx-auto flex max-w-5xl flex-col items-center text-center"
			>
				<p className="text-xs font-medium tracking-[0.32em] text-[#f0dcae] uppercase">Açaípulse®</p>

				<h2 className="mt-7 text-5xl leading-[0.95] font-medium tracking-[-0.06em] text-balance sm:text-6xl lg:text-8xl">
					A Amazônia inspira.
					<br />
					Uma nova experiência começa.
				</h2>

				<p className="mt-8 max-w-2xl text-lg leading-8 text-white/65">
					Descubra uma apresentação que conecta identidade, informação e uma nova maneira de conhecer o produto.
				</p>

				<div className="mt-10 flex flex-col gap-4 sm:flex-row">
					<motion.a
						href="#produto"
						whileHover={shouldReduceMotion ? undefined : { scale: 1.025 }}
						whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
						className={cn(
							buttonVariants({
								size: 'lg',
							}),
							'rounded-full bg-[#f5efe4] px-8 text-[#32113b] hover:bg-white'
						)}
					>
						Conhecer o Açaípulse
						<ArrowRight data-icon="inline-end" className="size-4" />
					</motion.a>

					<a
						href="#faq"
						className={cn(
							buttonVariants({
								variant: 'outline',
								size: 'lg',
							}),
							'rounded-full border-white/25 bg-white/5 px-8 text-white hover:bg-white/10 hover:text-white'
						)}
					>
						Ver perguntas frequentes
					</a>
				</div>
			</motion.div>
		</section>
	);
}
