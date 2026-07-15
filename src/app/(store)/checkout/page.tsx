import { Suspense } from 'react';

import { AuthGuard } from '@/features/auth/components/auth-guard';
import { CheckoutScreen } from '@/features/checkout/components/checkout-screen';

export default function CheckoutPage() {
	return (
		<Suspense fallback={null}>
			<AuthGuard>
				<CheckoutScreen />
			</AuthGuard>
		</Suspense>
	);
}
