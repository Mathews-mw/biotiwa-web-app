import dayjs from 'dayjs';
import Image from 'next/image';

import type { IOrderDetails } from '../../types/order.types';

import { priceFormatter } from '@/utils/price-formatter';
import { getOrderStatusText } from '../../helpers/get-order-status-text';

import { Button } from '@/components/ui/button';
import { OrderProgress } from '../order-progress';
import { Separator } from '@/components/ui/separator';
import { OrderStatusBadge } from '../order-status-badge';

interface IProps {
	order: IOrderDetails;
}

export function ProductSummary({ order }: IProps) {
	const orderStatusText = getOrderStatusText({ status: order.status, locale: 'pt-BR' });

	return (
		<div className="bg-background col-span-2 space-y-8 rounded-lg border p-6 shadow-sm">
			<div className="flex w-full flex-col-reverse justify-between gap-4 lg:flex-row lg:items-center lg:gap-0">
				<div className="text-sm font-semibold">
					<h4>Pedido: {order.id}</h4>
					<div>
						<span>Data: </span>
						{order && <span>{dayjs(order.created_at).format('DD/MM/YYYY')}</span>}
					</div>
				</div>

				<OrderStatusBadge text={orderStatusText} status={order.status} />
			</div>

			<Separator />

			{order.items.map((item) => {
				return (
					<div key={item.id} className="flex w-full justify-between">
						<div className="flex gap-3">
							<Image
								src={item.product?.image_url ?? ''}
								alt={item.product?.name ?? 'Imagem do produto'}
								width={1020}
								height={1020}
								className="h-16.25 w-16.25 rounded-lg border object-cover p-px"
							/>
							<div className="flex flex-col">
								<span title="" className="line-clamp-1 text-sm font-bold">
									{item.product?.name}
								</span>
								<span className="text-muted-foreground text-sm">Quantidade: {item.quantity}</span>
							</div>
						</div>

						<span className="text-muted-foreground font-bold">
							{priceFormatter({ value: item.total_amount / 100 })}
						</span>
					</div>
				);
			})}

			<Separator />

			<div className="flex w-full flex-col justify-center gap-2 lg:flex-row lg:justify-end lg:gap-4">
				<Button variant="secondary">Ajuda com o pedido</Button>
				<Button variant="outline">Rastreio detalhado</Button>
			</div>

			<OrderProgress />
		</div>
	);
}
