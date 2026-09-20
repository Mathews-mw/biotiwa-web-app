import type { IOrderDetails } from '../../types/order.types';
import type { IPayment } from '@/features/payment/types/payment.types';

import { priceFormatter } from '@/utils/price-formatter';
import { zipCodeFormatter } from '@/utils/zip-code-formatter';

import { Separator } from '@/components/ui/separator';

interface IProps {
	order: IOrderDetails;
	payment?: IPayment | null;
}

export function PaymentSummary({ order, payment }: IProps) {
	const orderShippingAddress = order.order_shipping_address;

	return (
		<div className="bg-background h-min space-y-4 rounded-lg border p-6 shadow-sm">
			<div>
				<span>
					Forma de pagamento: <strong>{payment?.payment_type}</strong>
				</span>
			</div>

			<Separator />

			{orderShippingAddress && (
				<div className="flex flex-col gap-1">
					<span>Endereço de entrega: </span>

					<div className="flex flex-col gap-1 text-sm font-semibold">
						<span>
							{orderShippingAddress.street}, Número {orderShippingAddress.number}
						</span>
						<div>{orderShippingAddress.complement && <span>{orderShippingAddress.complement}</span>}</div>
						<span>
							CEP: {zipCodeFormatter({ zipCode: orderShippingAddress.zip_code })} | {orderShippingAddress.city} -{' '}
							{orderShippingAddress.state}
						</span>
					</div>
				</div>
			)}

			<Separator />

			<div className="space-y-2 rounded border p-2 text-sm">
				<div className="flex w-full justify-between">
					<span>Total produto(s)</span>
					<span className="font-semibold">{priceFormatter({ value: order.subtotal_amount / 100 })}</span>
				</div>
				<div className="flex w-full justify-between">
					<span>Descontos</span>
					<span className="font-semibold">{priceFormatter({ value: (order.discount_amount / 100) * -1 })}</span>
				</div>
				<div className="flex w-full justify-between">
					<span>Entrega</span>
					<span className="font-semibold">{priceFormatter({ value: order.shipping_amount / 100 })}</span>
				</div>

				<Separator />

				<div className="flex w-full justify-between rounded font-bold">
					<span>Total</span>
					<span>{priceFormatter({ value: payment ? payment.amount / 100 : 0 })}</span>
				</div>
			</div>
		</div>
	);
}
