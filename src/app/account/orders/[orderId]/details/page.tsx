import { Suspense } from 'react';

import { OrderDetailsSCreen } from '@/features/order/components/order-details/order-details-screen';

interface PageProps {
	params: Promise<{ orderId: string }>;
}

export default async function OrderDetailsPage({ params }: PageProps) {
	const { orderId } = await params;

	return (
		<Suspense fallback={null}>
			<OrderDetailsSCreen orderId={orderId} />
		</Suspense>
	);
}
