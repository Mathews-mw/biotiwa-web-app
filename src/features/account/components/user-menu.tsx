'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { getUserInitials } from '../lib/get-user-initials';
import { useLogoutMutation, useSessionQuery } from '@/features/auth/hooks/use-auth-queries';

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

import { LogOut, ShoppingBag, UserRound } from 'lucide-react';

export function UserMenu() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const sessionQuery = useSessionQuery();
	const logoutMutation = useLogoutMutation();

	const currentPath = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

	const loginHref = `/login?next=${encodeURIComponent(currentPath)}`;

	const session = sessionQuery.data?.session;

	async function handleLogout() {
		await logoutMutation.mutateAsync();
		router.push('/');
	}

	if (sessionQuery.isLoading) {
		return <div className="h-10 w-24 animate-pulse rounded-full bg-white/10" />;
	}

	if (!session) {
		return (
			<Button asChild size="sm" className="rounded-full bg-[#f5efe4] text-[#16091f] hover:bg-white">
				<Link href={loginHref}>Entrar</Link>
			</Button>
		);
	}

	const initials = getUserInitials(session.user.name);

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

					<span className="hidden max-w-28 truncate pr-2 sm:block">{session.user.name}</span>
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="w-64 border-white/10 bg-[#120916] text-white">
				<DropdownMenuLabel>
					<p className="font-medium">{session.user.name}</p>
					<p className="mt-1 truncate text-xs font-normal text-white/45">{session.user.email}</p>
				</DropdownMenuLabel>

				<DropdownMenuSeparator className="bg-white/10" />

				<DropdownMenuItem asChild className="cursor-pointer focus:bg-white/10">
					<Link href="/checkout">
						<ShoppingBag className="size-4" />
						Carrinho
					</Link>
				</DropdownMenuItem>

				<DropdownMenuItem asChild className="cursor-pointer focus:bg-white/10">
					<Link href="/account">
						<UserRound className="size-4" />
						Minha conta
					</Link>
				</DropdownMenuItem>

				<DropdownMenuItem
					onClick={handleLogout}
					disabled={logoutMutation.isPending}
					className="cursor-pointer text-red-200 focus:bg-red-500/10 focus:text-red-100"
				>
					<LogOut className="size-4" />
					{logoutMutation.isPending ? 'Saindo...' : 'Sair'}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export function UserMenuFallback() {
	return <div className="h-10 w-24 animate-pulse rounded-full bg-white/10" />;
}
