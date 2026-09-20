'use client';

import { Suspense, useState } from 'react';

import { cn } from '@/lib/utils';

import { buttonVariants } from '@/components/ui/button';
import { navigationItems } from '@/content/landing-page';
import { UserMenu, UserMenuFallback } from '@/features/account/components/user-menu';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { Menu } from 'lucide-react';

export function AccountHeader() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<header className={'bg-valentino/90 border-b border-white/10 shadow-2xl shadow-black/10 backdrop-blur-xl'}>
			<div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
				<a
					href="#top"
					aria-label="Açaípulse — Voltar ao início"
					className="text-brand-cream relative z-10 text-xl font-semibold tracking-[-0.04em]"
				>
					Açaí
					<span className="text-brand-violet">pulse</span>
					<sup className="ms-0.5 text-[0.45em] font-normal">®</sup>
				</a>

				<nav aria-label="Navegação principal" className="hidden items-center gap-8 lg:flex">
					{navigationItems.map((item) => (
						<a
							key={item.href}
							href={item.href}
							className="hover:text-brand-violet text-sm text-white transition-colors"
						>
							{item.label}
						</a>
					))}
				</nav>

				<div className="hidden lg:block">
					<a
						href="#produto"
						className={cn(
							buttonVariants({
								variant: 'outline',
								size: 'sm',
							}),
							'rounded-full border-white/20 bg-white/5 px-5 text-white hover:bg-white hover:text-[#150b19]'
						)}
					>
						Conhecer o produto
					</a>
				</div>

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

							<SheetDescription className="text-white/50">Conheça o produto e sua origem.</SheetDescription>
						</SheetHeader>

						<nav aria-label="Navegação mobile" className="mt-10 flex flex-col gap-2 px-4">
							{navigationItems.map((item) => (
								<a
									key={item.href}
									href={item.href}
									onClick={() => setIsMenuOpen(false)}
									className="border-b border-white/10 py-5 text-xl text-white/80 transition-colors hover:text-white"
								>
									{item.label}
								</a>
							))}

							<a
								href="#produto"
								onClick={() => setIsMenuOpen(false)}
								className={cn(
									buttonVariants({
										size: 'lg',
									}),
									'mt-6 rounded-full bg-[#f5efe4] text-[#16091f] hover:bg-white'
								)}
							>
								Conhecer o produto
							</a>
						</nav>
					</SheetContent>
				</Sheet>

				<Suspense fallback={UserMenuFallback()}>
					<UserMenu />
				</Suspense>
			</div>
		</header>
	);
}
