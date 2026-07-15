import { Suspense } from 'react';

import { SuccessScreen } from '@/features/checkout/components/success-screen';

export default async function SuccessPage() {
	return (
		<Suspense fallback={null}>
			<SuccessScreen />
		</Suspense>
	);
}
