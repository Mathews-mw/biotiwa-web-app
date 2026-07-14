'use client';

import { useEffect, type ReactNode } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useSessionQuery } from '../hooks/use-auth-queries';

import { AuthGuardState } from './auth-guard-state';

type AuthGuardProps = {
	children: ReactNode;
};

export function AuthGuard({ children }: AuthGuardProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const sessionQuery = useSessionQuery();

	const currentPath = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

	useEffect(() => {
		if (sessionQuery.isLoading) {
			return;
		}

		if (!sessionQuery.data?.session) {
			router.replace(`/login?next=${encodeURIComponent(currentPath)}`);
		}
	}, [sessionQuery.isLoading, sessionQuery.data?.session, router, currentPath]);

	if (sessionQuery.isLoading) {
		return (
			<AuthGuardState title="Verificando sua sessão" description="Estamos confirmando se você já está autenticado." />
		);
	}

	if (!sessionQuery.data?.session) {
		return (
			<AuthGuardState
				title="Redirecionando para login"
				description="Você precisa entrar na sua conta para continuar."
			/>
		);
	}

	return children;
}
