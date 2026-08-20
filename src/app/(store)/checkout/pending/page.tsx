import { Suspense } from 'react';

import { CheckoutPendingScreen } from '@/features/checkout/components/checkout-pending-screen';

export default function CheckoutPendingPage() {
	return (
		<Suspense fallback={null}>
			<CheckoutPendingScreen />
		</Suspense>
	);
}
