import { Suspense } from 'react';

import { AuthGuard } from '@/features/auth/components/auth-guard';
import { AccountScreen } from '@/features/account/components/account-screen';

export default function AccountPage() {
	return (
		<Suspense fallback={null}>
			<AuthGuard>
				<AccountScreen />
			</AuthGuard>
		</Suspense>
	);
}
