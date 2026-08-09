'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { getUserInitials } from '../lib/get-user-initials';
import { useGetActiveCartQuery } from '@/features/cart/hooks/use-cart-queries';
import { useAuthSession } from '@/features/auth/hooks/use-auth-session';
import { useLogoutMutation } from '@/features/auth/hooks/use-auth-queries';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Loader2, LogOut, ShoppingBag, UserRound } from 'lucide-react';
import { useMemo } from 'react';

export function UserMenu() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const { user, status } = useAuthSession();
	const logoutMutation = useLogoutMutation();

	const currentPath = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

	const loginHref = `/login?next=${encodeURIComponent(currentPath)}`;

	const { data: activeCartData } = useGetActiveCartQuery({
		enabled: Boolean(user),
	});

	const cartItemsCount = useMemo(() => {
		const hasActiveCart = !!activeCartData && activeCartData.cart !== null;

		if (!hasActiveCart) {
			return 0;
		}

		const cartItems = activeCartData.cart.items;

		return cartItems.reduce((total, item) => {
			return total + item.quantity;
		}, 0);
	}, [activeCartData]);

	async function handleLogout() {
		await logoutMutation.mutateAsync();

		router.refresh();
		router.push('/');
	}

	if (status === 'loading') {
		return <div className="h-10 w-24 animate-pulse rounded-full bg-white/10" />;
	}

	if (!user) {
		return (
			<Button asChild size="sm" className="rounded-full bg-[#f5efe4] text-[#16091f] hover:bg-white">
				<Link href={loginHref}>Entrar</Link>
			</Button>
		);
	}

	const initials = getUserInitials(user.name);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					type="button"
					className="flex items-center gap-3 rounded-full border border-white/10 bg-white/4 px-2 py-1.5 text-sm text-white transition-colors hover:bg-white/8"
				>
					<Avatar className="size-8">
						<AvatarFallback className="bg-brand-gold text-xs font-semibold text-[#16091f]">{initials}</AvatarFallback>
					</Avatar>

					<span className="hidden max-w-28 truncate pr-2 sm:block">{user.name}</span>
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="w-64">
				<DropdownMenuLabel>
					<p className="font-medium">{user.name}</p>
					<p className="mt-1 truncate text-xs font-normal">{user.email}</p>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />

				<DropdownMenuItem asChild className="cursor-pointer">
					<Link href="/checkout">
						<ShoppingBag className="size-4" />
						Carrinho
						{cartItemsCount > 0 && (
							<span className="bg-brand-gold ml-auto rounded-full px-2 py-0.5 text-xs text-[#16091f]">
								{cartItemsCount}
							</span>
						)}
					</Link>
				</DropdownMenuItem>

				<DropdownMenuItem asChild className="cursor-pointer">
					<Link href="/account/profile">
						<UserRound className="size-4" />
						Minha conta
					</Link>
				</DropdownMenuItem>

				<DropdownMenuItem onClick={handleLogout} disabled={logoutMutation.isPending} variant="destructive">
					{logoutMutation.isPending ? <Loader2 className="size-4 animate-spin" /> : <LogOut className="size-4" />}
					{logoutMutation.isPending ? 'Saindo...' : 'Sair'}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export function UserMenuFallback() {
	return <div className="h-10 w-24 animate-pulse rounded-full bg-white/10" />;
}
