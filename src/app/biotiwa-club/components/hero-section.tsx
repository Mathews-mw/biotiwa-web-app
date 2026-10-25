'use client';

import { motion } from 'motion/react';

export function HeroSection() {
	return (
		<section className="relative overflow-hidden bg-[#1b260d]">
			<div className="sticky top-0 flex items-center overflow-hidden pt-10">
				<div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
					<motion.div className="relative z-20 gap-4">
						<motion.p
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.7,
								ease: [0.22, 1, 0.36, 1],
							}}
							className="mb-6 font-bold tracking-[0.22em] text-[#d7b56d]"
						>
							CLUBE BIOTIWA
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
							Leve a performance mais longe.
						</motion.h1>

						<motion.p
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.8,
								delay: 0.25,
								ease: [0.22, 1, 0.36, 1],
							}}
							className="mt-8 max-w-xl text-base leading-8 text-white sm:text-lg"
						>
							Compartilhe uma nova forma de viver performance, bem-estar e cuidado. Faça parte do{' '}
							<strong>Club Biotiwa</strong>, leve nossos produtos para mais pessoas e receba X% de comissão pelas suas
							vendas. <strong>Performance que se compartilha. Valor que retorna para você.</strong>
						</motion.p>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
