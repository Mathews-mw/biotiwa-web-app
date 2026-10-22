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

	return <Badge variant={status === 'CANCELED' ? 'destructive' : 'secondary'}>{labels[status]}</Badge>;
}
