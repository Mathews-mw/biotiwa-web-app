import { Badge } from '@/components/ui/badge';
import { IAffiliateStatus } from '../types/affiliate.types';

interface IProps {
	status: IAffiliateStatus;
}

const labels: Record<IAffiliateStatus, string> = {
	ACTIVE: 'Ativo',
	PENDING: 'Em análise',
	SUSPENDED: 'Suspenso',
	INACTIVE: 'Inativo',
};

export function AffiliateStatusBadge({ status }: IProps) {
	if (status === 'SUSPENDED') {
		return <Badge variant="destructive">{labels[status]}</Badge>;
	}

	if (status === 'ACTIVE') {
		return <Badge>{labels[status]}</Badge>;
	}

	return <Badge variant="secondary">{labels[status]}</Badge>;
}
