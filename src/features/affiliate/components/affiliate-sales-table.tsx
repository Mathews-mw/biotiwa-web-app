import type { IAffiliateSales } from '../types/affiliate.types';

import { dateFormatter } from '@/utils/date-formatter';
import { priceFormatter } from '@/utils/price-formatter';

import { AffiliateCommissionStatusBadge } from './affiliate-commission-status-badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface IProps {
	sales: IAffiliateSales[];
}

export function AffiliateSalesTable({ sales }: IProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Data</TableHead>
					<TableHead>Pedido</TableHead>
					<TableHead>Código</TableHead>
					<TableHead>Venda</TableHead>
					<TableHead>Comissão</TableHead>
					<TableHead>Status</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{sales.map((sale) => {
					const createdDateFormatted = dateFormatter({
						date: sale.created_at,
						locale: 'pt-BR',
						abbreviation: 'medium',
						includeTime: true,
					});

					return (
						<TableRow key={sale.commission_id}>
							<TableCell>{createdDateFormatted.date}</TableCell>
							<TableCell>{sale.order_id}</TableCell>
							<TableCell>{sale.promotion_code}</TableCell>
							<TableCell>{priceFormatter({ value: sale.sale_amount, currency: sale.currency })}</TableCell>
							<TableCell>{priceFormatter({ value: sale.commission_amount, currency: sale.currency })}</TableCell>

							<TableCell>
								<AffiliateCommissionStatusBadge status={sale.commission_status} />
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}
