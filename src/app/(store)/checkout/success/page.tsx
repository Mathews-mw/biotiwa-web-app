import { Suspense } from 'react';

import { CheckoutSuccessScreen } from '@/features/checkout/components/checkout-success-screen';

export default function CheckoutSuccessPage() {
	return (
		<Suspense fallback={null}>
			<CheckoutSuccessScreen />
		</Suspense>
	);
}
