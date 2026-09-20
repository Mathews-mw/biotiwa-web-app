import { IOrderStatus } from '../types/order.types';

export function getOrderStatusText({
	status,
	locale = 'pt-BR',
}: {
	status: IOrderStatus;
	locale: 'pt-BR' | 'en-US';
}): string {
	switch (status) {
		case 'PENDING_PAYMENT':
			return locale === 'pt-BR' ? 'Pagamento pendente' : 'Pending payment';

		case 'PAID':
			return locale === 'pt-BR' ? 'Pago' : 'Paid';

		case 'PROCESSING':
			return locale === 'pt-BR' ? 'Em processamento' : 'Processing';

		case 'SHIPPED':
			return locale === 'pt-BR' ? 'Em transito' : 'Shipped';

		case 'DELIVERED':
			return locale === 'pt-BR' ? 'Entregue' : 'Delivered';

		case 'CANCELED':
			return locale === 'pt-BR' ? 'Cancelado' : 'Canceled';

		case 'REFUNDED':
			return locale === 'pt-BR' ? 'Reembolsado' : 'Refunded';

		case 'PAYMENT_FAILED':
			return locale === 'pt-BR' ? 'Pagamento falhou' : 'Payment failed';

		default:
			return locale === 'pt-BR' ? 'Pagamento pendente' : 'Pending payment';
	}
}
