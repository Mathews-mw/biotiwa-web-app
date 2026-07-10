'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { cn } from '@/lib/utils';

import { ingredientItems } from '@/content/landing-page';

export function IngredientsSection() {
	const [activeIngredientIndex, setActiveIngredientIndex] = useState(0);

	const activeIngredient = ingredientItems[activeIngredientIndex];

	return (
		<section className="overflow-hidden bg-[#efe6d9] px-6 py-28 text-[#1b0d21] lg:px-10 lg:py-40">
			<div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-24">
				<div>
					<span className="inline-flex rounded-full border border-[#6d247d]/15 bg-[#6d247d]/5 px-4 py-2 text-xs font-medium tracking-[0.2em] text-[#6d247d] uppercase">
						Conteúdo provisório
					</span>

					<p className="mt-8 text-xs font-semibold tracking-[0.28em] text-[#6d247d] uppercase">Composição</p>

					<h2 className="mt-6 max-w-xl text-5xl leading-[0.98] font-medium tracking-[-0.055em] text-balance sm:text-6xl">
						O que existe por trás da fórmula?
					</h2>

					<p className="mt-7 max-w-lg text-lg leading-8 text-[#1b0d21]/60">
						Esta seção deverá ser preenchida somente com os ingredientes e textos oficialmente aprovados pelo cliente.
					</p>

					<div className="mt-14 border-t border-[#1b0d21]/15">
						{ingredientItems.map((ingredient, index) => {
							const isActive = index === activeIngredientIndex;

							return (
								<button
									key={ingredient.name}
									type="button"
									aria-pressed={isActive}
									onClick={() => setActiveIngredientIndex(index)}
									onMouseEnter={() => setActiveIngredientIndex(index)}
									className="group flex w-full items-center justify-between border-b border-[#1b0d21]/15 py-6 text-start"
								>
									<div>
										<span className="text-xs text-[#6d247d]/60">{String(index + 1).padStart(2, '0')}</span>

										<p
											className={cn(
												'mt-1 text-xl transition-colors',
												isActive ? 'text-[#6d247d]' : 'text-[#1b0d21]/55 group-hover:text-[#1b0d21]'
											)}
										>
											{ingredient.name}
										</p>
									</div>

									<span
										className={cn(
											'size-2 rounded-full transition-all',
											isActive ? 'scale-100 bg-[#6d247d]' : 'scale-50 bg-[#1b0d21]/20'
										)}
									/>
								</button>
							);
						})}
					</div>
				</div>

				<div className="relative min-h-152 overflow-hidden rounded-[2.5rem] bg-[#16091f]">
					<div
						className="absolute inset-0 transition-[background] duration-500"
						style={{
							background: `radial-gradient(circle at center, ${activeIngredient.glow}, transparent 55%)`,
						}}
					/>

					<AnimatePresence mode="wait" initial={false}>
						<motion.div
							key={activeIngredient.image}
							initial={{ opacity: 0, scale: 1.08 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.96 }}
							transition={{
								duration: 0.55,
								ease: [0.22, 1, 0.36, 1],
							}}
							className="absolute inset-0"
						>
							<Image
								src={activeIngredient.image}
								alt={activeIngredient.name}
								fill
								sizes="(max-width: 1024px) 90vw, 45vw"
								className="object-cover opacity-85"
							/>

							<div className="absolute inset-0 bg-linear-to-t from-[#16091f] via-transparent to-transparent" />
						</motion.div>
					</AnimatePresence>

					<AnimatePresence mode="wait" initial={false}>
						<motion.div
							key={activeIngredient.name}
							initial={{ opacity: 0, y: 18 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -12 }}
							transition={{ duration: 0.35 }}
							className="absolute inset-x-8 bottom-8 z-10 rounded-3xl border border-white/10 bg-black/20 p-7 text-white backdrop-blur-xl sm:inset-x-10 sm:bottom-10"
						>
							<p className="text-xs tracking-[0.25em] text-[#d7b56d] uppercase">{activeIngredient.label}</p>

							<h3 className="mt-3 text-3xl font-medium">{activeIngredient.name}</h3>

							<p className="mt-4 max-w-lg text-sm leading-7 text-white/60">{activeIngredient.description}</p>
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</section>
	);
}
