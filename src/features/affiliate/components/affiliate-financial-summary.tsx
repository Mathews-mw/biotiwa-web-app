import { priceFormatter } from '@/utils/price-formatter';
import type { IAffiliateDashboardFinancial } from '../types/affiliate.types';

import { AffiliateDashboardCard } from './affiliate-dashboard-card';

interface IProps {
	financial: IAffiliateDashboardFinancial;
}

export function AffiliateFinancialSummary({ financial }: IProps) {
	return (
		<div className="space-y-4">
			<div>
				<h2 className="font-medium">{financial.currency}</h2>
			</div>

			<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
				<AffiliateDashboardCard title="Vendas" value={String(financial.sales_count)} />

				<AffiliateDashboardCard
					title="Total vendido"
					value={priceFormatter({ value: financial.sales_amount, currency: financial.currency, locale: 'pt-BR' })}
				/>

				<AffiliateDashboardCard
					title="Comissão acumulada"
					value={priceFormatter({ value: financial.commission_amount, currency: financial.currency })}
				/>

				<AffiliateDashboardCard
					title="Disponível"
					value={priceFormatter({ value: financial.available_amount, currency: financial.currency })}
				/>
			</div>
		</div>
	);
}
