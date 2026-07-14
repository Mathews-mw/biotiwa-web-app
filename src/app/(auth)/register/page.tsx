import { Suspense } from 'react';

import { RegisterForm } from '@/features/auth/components/register-form';
import { AuthPageShell } from '@/features/auth/components/auth-page-shell';

export default function RegisterPage() {
	return (
		<AuthPageShell
			title="Crie sua conta para finalizar o pedido."
			description="O cadastro será obrigatório para concluir a compra e acompanhar o fluxo do pedido."
		>
			<Suspense fallback={null}>
				<RegisterForm />
			</Suspense>
		</AuthPageShell>
	);
}
