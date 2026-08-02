'use client';

import { useEffect, type ReactNode } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useAuthSession } from '../hooks/use-auth-session';

import { AuthGuardState } from './auth-guard-state';

type AuthGuardProps = {
	children: ReactNode;
};

export function AuthGuard({ children }: AuthGuardProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const { status } = useAuthSession();

	const currentPath = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

	useEffect(() => {
		if (status === 'loading') {
			return;
		}

		if (status === 'unauthenticated') {
			router.replace(`/login?next=${encodeURIComponent(currentPath)}`);
		}
	}, [status, router, currentPath]);

	if (status === 'loading') {
		return (
			<AuthGuardState title="Verificando sua sessão" description="Estamos confirmando se você já está autenticado." />
		);
	}

	if (status === 'unauthenticated') {
		return (
			<AuthGuardState
				title="Redirecionando para login"
				description="Você precisa entrar na sua conta para continuar."
			/>
		);
	}

	return children;
}
