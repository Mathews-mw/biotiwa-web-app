import { Suspense } from 'react';

import { AuthGuard } from '@/features/auth/components/auth-guard';
import { UserOrdersScreen } from '@/features/account/components/user-orders/user-orders-screen';

export default function AccountPage() {
	return (
		<Suspense fallback={null}>
			<AuthGuard>
				<UserOrdersScreen />
			</AuthGuard>
		</Suspense>
	);
}
