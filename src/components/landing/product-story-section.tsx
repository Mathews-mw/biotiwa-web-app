'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react';

import { cn } from '@/lib/utils';

import { productStorySteps } from '@/content/landing-page';

export function ProductStorySection() {
	const sectionRef = useRef<HTMLElement>(null);
	const [activeStepIndex, setActiveStepIndex] = useState(0);
	const shouldReduceMotion = useReducedMotion();

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start start', 'end end'],
	});

	useMotionValueEvent(scrollYProgress, 'change', (latest) => {
		const nextIndex = Math.min(productStorySteps.length - 1, Math.floor(latest * productStorySteps.length));

		setActiveStepIndex((currentIndex) => {
			return currentIndex === nextIndex ? currentIndex : nextIndex;
		});
	});

	const productY = useTransform(
		scrollYProgress,
		[0, 0.33, 0.66, 1],
		shouldReduceMotion ? [0, 0, 0, 0] : [0, -36, 32, 0]
	);

	const productRotate = useTransform(
		scrollYProgress,
		[0, 0.33, 0.66, 1],
		shouldReduceMotion ? [0, 0, 0, 0] : [-4, 3, -2, 5]
	);

	const productScale = useTransform(scrollYProgress, [0, 0.5, 1], shouldReduceMotion ? [1, 1, 1] : [0.92, 1.04, 0.94]);

	const activeStep = productStorySteps[activeStepIndex];

	return (
		<section ref={sectionRef} id="origem" className="relative bg-[#0d0710] text-white lg:min-h-[400svh]">
			<motion.div
				style={{ scaleX: scrollYProgress }}
				className="from-brand-gold to-brand-acai fixed inset-x-0 top-0 z-60 h-0.5 origin-left bg-linear-to-r"
			/>

			<div className="mx-auto max-w-7xl px-6 py-28 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-10 lg:py-0">
				<div className="lg:py-[35svh]">
					<div className="mb-20 lg:hidden">
						<div className="relative mx-auto aspect-4/5 max-w-sm">
							<div className="bg-brand-violet/25 absolute inset-[15%] rounded-full blur-[80px]" />

							<Image
								src="/images/product/acaipulse-bottle.png"
								alt="Açaípulse"
								fill
								sizes="90vw"
								className="object-contain"
							/>
						</div>
					</div>

					{productStorySteps.map((step, index) => {
						const isActive = index === activeStepIndex;

						return (
							<article key={step.index} className="flex min-h-[75svh] items-center py-20 lg:min-h-svh lg:py-0">
								<div
									className={cn('max-w-xl transition-opacity duration-500', isActive ? 'opacity-100' : 'lg:opacity-35')}
								>
									<div className="flex items-center gap-4">
										<span className="text-brand-gold text-sm font-medium">{step.index}</span>

										<span className="bg-brand-gold/50 h-px w-12" />

										<span className="text-xs tracking-[0.26em] text-white/50 uppercase">{step.eyebrow}</span>
									</div>

									<h2 className="mt-8 text-4xl leading-[1.02] font-medium tracking-tighter text-balance sm:text-5xl lg:text-6xl">
										{step.title}
									</h2>

									<p className="mt-7 max-w-lg text-lg leading-8 text-white/55">{step.description}</p>
								</div>
							</article>
						);
					})}
				</div>

				<div className="relative hidden lg:block">
					<div className="sticky top-0 flex h-svh items-center justify-center">
						<div className="relative flex h-[80svh] w-full items-center justify-center overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/2.5">
							<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(121,42,143,0.26),transparent_48%)]" />

							<div className="absolute inset-10 rounded-full border border-white/5" />
							<div className="absolute inset-24 rounded-full border border-white/5" />

							<motion.div
								style={{
									y: productY,
									rotate: productRotate,
									scale: productScale,
								}}
								className="relative z-10 aspect-4/5 h-[100%]"
							>
								<Image
									src="/images/science/capsule_composition_nobg.png"
									alt="Embalagem do Açaípulse"
									fill
									sizes="(max-width: 1024px) 120vw, 60vw"
									className="object-contain drop-shadow-[0_40px_40px_rgba(0,0,0,0.45)]"
								/>
							</motion.div>

							<div className="absolute inset-x-10 bottom-10 flex items-end justify-between">
								<AnimatePresence mode="wait" initial={false}>
									<motion.div
										key={activeStep.index}
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										transition={{ duration: 0.3 }}
									>
										<span className="text-xs tracking-[0.25em] text-white/35 uppercase">Momento atual</span>

										<p className="mt-2 text-lg text-white/80">{activeStep.eyebrow}</p>
									</motion.div>
								</AnimatePresence>

								<span className="font-mono text-sm text-white/35">
									{activeStep.index}/{productStorySteps.length.toString().padStart(2, '0')}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
