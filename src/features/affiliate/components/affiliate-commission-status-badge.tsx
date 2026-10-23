import { Badge } from '@/components/ui/badge';
import type { IAffiliateCommissionStatus } from '../types/affiliate.types';

interface IProps {
	status: IAffiliateCommissionStatus;
}

export function AffiliateCommissionStatusBadge({ status }: IProps) {
	const labels = {
		PENDING: 'Pendente',
		AVAILABLE: 'Disponível',
		PAID: 'Pago',
		CANCELED: 'Cancelado',
	};

	return (
		<Badge variant={status === 'CANCELED' ? 'destructive' : status === 'AVAILABLE' ? 'default' : 'secondary'}>
			{labels[status]}
		</Badge>
	);
}
