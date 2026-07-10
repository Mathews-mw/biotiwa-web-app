'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

export function ManifestoSection() {
	const sectionRef = useRef<HTMLElement>(null);
	const shouldReduceMotion = useReducedMotion();

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start end', 'end start'],
	});

	const firstLineX = useTransform(scrollYProgress, [0, 0.5, 1], shouldReduceMotion ? [0, 0, 0] : [-80, 0, 40]);

	const secondLineX = useTransform(scrollYProgress, [0, 0.5, 1], shouldReduceMotion ? [0, 0, 0] : [80, 0, -40]);

	const opacity = useTransform(scrollYProgress, [0.05, 0.35, 0.75, 0.95], [0.2, 1, 1, 0.2]);

	return (
		<section
			ref={sectionRef}
			id="manifesto"
			className="relative flex min-h-[110svh] items-center overflow-hidden border-y border-white/5 bg-[#f2ebdf] px-6 py-32 text-[#1b0d21]"
		>
			<div className="absolute inset-0 bg-[radial-gradient(rgba(49,17,59,0.14)_1px,transparent_1px)] bg-size-[20px_20px] opacity-40" />

			<motion.div style={{ opacity }} className="relative mx-auto w-full max-w-7xl">
				<p className="mb-12 text-xs font-semibold tracking-[0.3em] text-[#6d247d] uppercase">Um novo olhar</p>

				<div className="space-y-4">
					<motion.p
						style={{ x: firstLineX }}
						className="text-5xl leading-[0.95] font-medium tracking-[-0.06em] text-balance sm:text-6xl lg:text-[7rem]"
					>
						Não é apenas sobre
					</motion.p>

					<motion.p
						style={{ x: secondLineX }}
						className="text-5xl leading-[0.95] font-medium tracking-[-0.06em] text-balance text-[#6d247d] sm:text-6xl lg:text-[7rem]"
					>
						de onde vem.
					</motion.p>
				</div>

				<p className="ms-auto mt-16 max-w-xl text-xl leading-9 text-[#1b0d21]/65 sm:text-2xl">
					É sobre transformar origem, conhecimento e identidade em uma experiência que possa ser compreendida.
				</p>
			</motion.div>
		</section>
	);
}
