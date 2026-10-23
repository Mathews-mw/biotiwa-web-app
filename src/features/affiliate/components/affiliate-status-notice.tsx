import type { IAffiliateStatus } from '../types/affiliate.types';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { AlertCircle, Clock3, CircleOff } from 'lucide-react';

interface IProps {
	status: IAffiliateStatus;
}

export function AffiliateStatusNotice({ status }: IProps) {
	if (status === 'ACTIVE') {
		return null;
	}

	if (status === 'PENDING') {
		return (
			<Alert>
				<Clock3 />

				<AlertTitle>Cadastro em análise</AlertTitle>

				<AlertDescription>
					Seu cadastro de afiliado ainda está aguardando aprovação. Seus códigos não podem ser utilizados enquanto a
					conta não for ativada.
				</AlertDescription>
			</Alert>
		);
	}

	if (status === 'SUSPENDED') {
		return (
			<Alert variant="destructive">
				<AlertCircle />

				<AlertTitle>Conta suspensa</AlertTitle>

				<AlertDescription>
					Sua participação no programa de afiliados está temporariamente suspensa. Seus códigos não estão disponíveis
					para novas compras.
				</AlertDescription>
			</Alert>
		);
	}

	return (
		<Alert>
			<CircleOff />

			<AlertTitle>Conta inativa</AlertTitle>

			<AlertDescription>
				Sua conta de afiliado está inativa. Você ainda pode consultar seu histórico, mas os códigos não estão
				disponíveis para novas vendas.
			</AlertDescription>
		</Alert>
	);
}
