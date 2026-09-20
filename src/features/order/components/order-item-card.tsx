'use client';

import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import type { IOrderDetails } from '../types/order.types';

import { getOrderStatusText } from '../helpers/get-order-status-text';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { OrderStatusBadge } from './order-status-badge';

import { PackageSearch } from 'lucide-react';

interface IOrderItemCardProps {
	orderDetails: IOrderDetails;
}

export function OrderItemCard({ orderDetails }: IOrderItemCardProps) {
	const router = useRouter();

	const statusText = getOrderStatusText({ status: orderDetails.status, locale: 'pt-BR' });

	return (
		<div className="bg-background space-y-4 rounded-lg border p-4 shadow-sm">
			<div className="flex w-full flex-col-reverse justify-between gap-2.5 lg:flex-row lg:gap-0">
				<div className="text-muted-foreground flex flex-col gap-1 text-sm">
					<p>
						Pedido: <strong>{orderDetails.id}</strong>
					</p>
					<p>
						Data da compra: <strong>{dayjs(orderDetails.created_at).format('DD/MM/YYYY')}</strong>
					</p>
					{/* <p>
						Tipo pagamento: <strong>{payment ? payment.payment_type : 'A Definir'}</strong>
					</p> */}
				</div>

				<div className="flex w-full justify-end lg:w-min">
					<OrderStatusBadge status={orderDetails.status} text={statusText} />
				</div>
			</div>
			<Separator />
			<div className="flex w-full flex-col justify-between gap-2.5 lg:flex-row lg:gap-0">
				<div className="w-full space-y-2">
					{orderDetails.items.map((item) => {
						return (
							<div className="flex gap-3" key={item.id}>
								<Image
									src={item.product?.image_url ?? ''}
									alt=""
									width={1020}
									height={1020}
									className="h-16.25 w-16.25 rounded-lg border object-cover p-px"
								/>
								<div className="flex flex-col">
									<span title={item.product?.name} className="line-clamp-1 text-sm font-bold">
										{item.product?.name}
									</span>
									<span className="text-sm">Quantidade: {item.quantity}</span>
								</div>
							</div>
						);
					})}
				</div>

				<Button size="sm" variant="outline" onClick={() => router.push(`/account/orders/${orderDetails.id}/details`)}>
					<PackageSearch className="h-5 w-5" />
					Detalhes do pedido
				</Button>
			</div>
		</div>
	);
}
