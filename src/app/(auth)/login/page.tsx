import { Suspense } from 'react';

import { LoginForm } from '@/features/auth/components/login-form';
import { AuthPageShell } from '@/features/auth/components/auth-page-shell';

export default function LoginPage() {
	return (
		<AuthPageShell
			title="Entre para continuar sua compra."
			description="Sua conta mantém a sessão ativa, preserva sua intenção de compra e prepara o checkout para as próximas etapas."
		>
			<Suspense fallback={null}>
				<LoginForm />
			</Suspense>
		</AuthPageShell>
	);
}
