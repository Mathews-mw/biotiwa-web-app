'use client';

import Link from 'next/link';
import { Suspense, useState } from 'react';

import { cn } from '@/lib/utils';

import { buttonVariants } from '@/components/ui/button';
import { UserMenu, UserMenuFallback } from '@/features/account/components/user-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { Menu, Store } from 'lucide-react';

export function AffiliateHeader() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<header className={'border-b border-white/10 bg-[#1b260d] shadow-2xl shadow-black/10 backdrop-blur-xl'}>
			<div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
				<Link
					href="/"
					aria-label="Açaípulse — Voltar ao início"
					className="text-brand-cream relative z-10 text-xl font-semibold tracking-[-0.04em]"
				>
					Açaí
					<span className="text-brand-violet">pulse</span>
					<sup className="ms-0.5 text-[0.45em] font-normal">®</sup>
				</Link>

				<Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
					<SheetTrigger
						aria-label="Abrir menu"
						className={cn(
							buttonVariants({
								variant: 'ghost',
								size: 'icon',
							}),
							'text-white hover:bg-white/10 hover:text-white lg:hidden'
						)}
					>
						<Menu className="size-5" />
					</SheetTrigger>

					<SheetContent side="right" className="w-full border-white/10 bg-[#100813] text-white sm:max-w-sm">
						<SheetHeader className="text-start">
							<SheetTitle className="text-xl text-white">
								Açaí
								<span className="text-brand-violet">pulse</span>
							</SheetTitle>
						</SheetHeader>

						<nav aria-label="Navegação mobile" className="mt-10 flex flex-col gap-2 px-4">
							<Link
								href="/"
								onClick={() => setIsMenuOpen(false)}
								className={cn(
									buttonVariants({
										size: 'lg',
									}),
									'mt-6 rounded-full bg-[#f5efe4] text-[#16091f] hover:bg-white'
								)}
							>
								<Store />
								Ir para loja
							</Link>
						</nav>
					</SheetContent>
				</Sheet>

				<div className="flex items-center gap-8">
					<div className="hidden lg:block">
						<Link
							href="/"
							className={cn(
								buttonVariants({
									variant: 'outline',
									size: 'sm',
								}),
								'rounded-full border-white/20 bg-white/5 px-5 text-white hover:bg-white hover:text-[#150b19]'
							)}
						>
							<Store />
							Ir para loja
						</Link>
					</div>

					<Suspense fallback={UserMenuFallback()}>
						<UserMenu />
					</Suspense>
				</div>
			</div>
		</header>
	);
}
