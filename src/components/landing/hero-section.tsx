'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

import { cn } from '@/lib/utils';

import { buttonVariants } from '@/components/ui/button';

import { ArrowDown, ArrowRight } from 'lucide-react';

export function HeroSection() {
	const sectionRef = useRef<HTMLElement>(null);
	const shouldReduceMotion = useReducedMotion();

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start start', 'end start'],
	});

	const contentY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 120]);

	const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

	const productY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 180]);

	const productScale = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1] : [1, 0.78]);

	const productRotate = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 7]);

	return (
		<section ref={sectionRef} id="top" className="relative min-h-[130svh] overflow-hidden bg-[#0d0710]">
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(124,38,145,0.32),transparent_36%),radial-gradient(circle_at_15%_80%,rgba(75,26,82,0.45),transparent_32%)]" />

				<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] bg-size-[72px_72px] opacity-[0.045]" />

				<div className="absolute inset-s-1/2 top-1/2 h-168 w-2xl -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />

				<div className="absolute inset-s-1/2 top-1/2 h-128 w-lg -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
			</div>

			<div className="sticky top-0 flex min-h-svh items-center overflow-hidden pt-20">
				<div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
					<motion.div
						style={{
							y: contentY,
							opacity: contentOpacity,
						}}
						className="relative z-20"
					>
						<motion.p
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.7,
								ease: [0.22, 1, 0.36, 1],
							}}
							className="mb-6 text-xs font-medium tracking-[0.32em] text-[#d7b56d] uppercase"
						>
							Biotiwa · Amazon Labs
						</motion.p>

						<motion.h1
							initial={{ opacity: 0, y: 28 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.9,
								delay: 0.1,
								ease: [0.22, 1, 0.36, 1],
							}}
							className="max-w-4xl text-5xl leading-[0.93] font-medium tracking-[-0.06em] text-balance text-[#f7f1e8] sm:text-6xl lg:text-[5.6rem]"
						>
							A força da Amazônia em uma{' '}
							<span className="bg-linear-to-r from-[#d7b56d] via-[#c17adc] to-[#8a3ca0] bg-clip-text text-transparent">
								nova forma.
							</span>
						</motion.h1>

						<motion.p
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.8,
								delay: 0.25,
								ease: [0.22, 1, 0.36, 1],
							}}
							className="mt-8 max-w-xl text-base leading-8 text-white/60 sm:text-lg"
						>
							Uma experiência que conecta origem, pesquisa e uma nova maneira de conhecer o Açaípulse.
						</motion.p>

						<motion.div
							initial={{ opacity: 0, y: 18 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.7,
								delay: 0.4,
							}}
							className="mt-10 flex flex-col gap-4 sm:flex-row"
						>
							<motion.a
								href="#origem"
								whileHover={shouldReduceMotion ? undefined : { scale: 1.025 }}
								whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
								className={cn(
									buttonVariants({
										size: 'lg',
									}),
									'rounded-full bg-[#f5efe4] px-7 text-[#16091f] hover:bg-white'
								)}
							>
								Descobrir o produto
								<ArrowRight data-icon="inline-end" className="size-4" />
							</motion.a>

							<a
								href="#diferenciais"
								className={cn(
									buttonVariants({
										variant: 'outline',
										size: 'lg',
									}),
									'rounded-full border-white/15 bg-white/3 px-7 text-white hover:bg-white/10 hover:text-white'
								)}
							>
								Explorar diferenciais
							</a>
						</motion.div>
					</motion.div>

					<motion.div
						style={{
							y: productY,
							scale: productScale,
							rotate: productRotate,
						}}
						className="relative z-10 mx-auto w-full max-w-md lg:max-w-lg"
					>
						<motion.div
							initial={{
								opacity: 0,
								scale: shouldReduceMotion ? 1 : 0.82,
								y: shouldReduceMotion ? 0 : 40,
							}}
							animate={{
								opacity: 1,
								scale: 1,
								y: 0,
							}}
							transition={{
								duration: 1.2,
								delay: 0.2,
								ease: [0.22, 1, 0.36, 1],
							}}
							className="relative aspect-4/5"
						>
							<div className="absolute inset-[12%] rounded-full bg-[#8f3cab]/30 blur-[90px]" />

							<Image
								src="/images/product/bottle-no-bg.png"
								alt="Embalagem do suplemento Açaípulse"
								fill
								priority
								sizes="(max-width: 1024px) 80vw, 42vw"
								className="object-contain drop-shadow-[0_45px_45px_rgba(0,0,0,0.5)]"
							/>
						</motion.div>
					</motion.div>
				</div>

				<motion.a
					href="#manifesto"
					aria-label="Continuar navegando"
					animate={
						shouldReduceMotion
							? undefined
							: {
								y: [0, 8, 0],
							}
					}
					transition={{
						duration: 1.8,
						repeat: Number.POSITIVE_INFINITY,
						ease: 'easeInOut',
					}}
					className="absolute inset-s-1/2 bottom-8 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] tracking-[0.24em] text-white/40 uppercase"
				>
					Scroll
					<ArrowDown className="size-4" />
				</motion.a>
			</div>
		</section>
	);
}
