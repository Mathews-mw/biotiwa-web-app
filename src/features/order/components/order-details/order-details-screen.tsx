'use client';

import { useGetOrderDetails } from '../../hooks/use-orders-query';

import { ReviewCard } from './review-card';
import { PaymentSummary } from './payment-summary';
import { ProductSummary } from './product-summary';
import { BackButton } from '@/components/back-button';
import { PaymentSummarySkeleton } from './payment-summary-skeleton';
import { ProductSummarySkeleton } from './product-summary-skeleton';

import { PackageSearch } from 'lucide-react';

interface IScreenProps {
	orderId: string;
}

export function OrderDetailsSCreen({ orderId }: IScreenProps) {
	const { data: orderDetailsData, isFetching } = useGetOrderDetails({ orderId, enabled: !!orderId });

	return (
		<div className="my-8 space-y-8">
			<div className="flex w-full items-center justify-between">
				<div className="flex items-center gap-2">
					<PackageSearch className="text-brand-acai size-9" />
					<h1 className="text-jaguar text-3xl font-medium tracking-tight">Detalhes do pedido</h1>
				</div>

				<BackButton />
			</div>

			<div className="flex flex-col gap-8 lg:grid lg:grid-cols-3">
				{orderDetailsData ? <ProductSummary order={orderDetailsData.order} /> : <ProductSummarySkeleton />}

				{orderDetailsData ? (
					<div className="space-y-4">
						<PaymentSummary order={orderDetailsData.order} payment={orderDetailsData.payment} />
						<ReviewCard disabled={orderDetailsData.order.status !== 'DELIVERED'} />
					</div>
				) : (
					<div className="space-y-4">
						<PaymentSummarySkeleton />
						<ReviewCard isLoading={isFetching} />
					</div>
				)}
			</div>
		</div>
	);
}
