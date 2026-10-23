import type { IAffiliateDashboardFinancial } from '../types/affiliate.types';

import { priceFormatter } from '@/utils/price-formatter';

import { AffiliateDashboardCard } from './affiliate-dashboard-card';

interface IProps {
	financial: IAffiliateDashboardFinancial;
}

export function AffiliateFinancialSummary({ financial }: IProps) {
	return (
		<section className="space-y-4">
			<h2 className="text-lg font-semibold">Resumo em {financial.currency}</h2>

			<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

			<div className="grid gap-4 sm:grid-cols-3">
				<AffiliateDashboardCard
					title="Pendente"
					value={priceFormatter({ value: financial.pending_amount, currency: financial.currency })}
					description="Aguardando liberação"
				/>

				<AffiliateDashboardCard
					title="Disponível"
					value={priceFormatter({ value: financial.available_amount, currency: financial.currency })}
					description="Disponível para pagamento"
				/>

				<AffiliateDashboardCard
					title="Já pago"
					value={priceFormatter({ value: financial.paid_amount, currency: financial.currency })}
				/>
			</div>
		</section>
	);
}
