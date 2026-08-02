'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useAuthSession } from '@/features/auth/hooks/use-auth-session';
import { getSafeNextPath } from '@/features/auth/lib/get-safe-next-path';

import { LoginForm } from '@/features/auth/components/login-form';
import { AuthPageShell } from '@/features/auth/components/auth-page-shell';

function LoginPageContent() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { status } = useAuthSession();

	const nextPath = getSafeNextPath(searchParams.get('next'));

	useEffect(() => {
		if (status === 'authenticated') {
			router.replace(nextPath);
		}
	}, [status, nextPath, router]);

	return (
		<AuthPageShell
			title="Entre para continuar sua compra."
			description="Sua conta mantém a sessão ativa, preserva sua intenção de compra e prepara o checkout para as próximas etapas."
		>
			<LoginForm />
		</AuthPageShell>
	);
}

export default function LoginPage() {
	return (
		<Suspense fallback={null}>
			<LoginPageContent />
		</Suspense>
	);
}
