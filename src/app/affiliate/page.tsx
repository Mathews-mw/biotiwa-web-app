'use client';

import { useAffiliateDashboardQuery } from '@/features/affiliate/hooks/use-affiliate-dashboard-query';

import { AffiliateEmptyState } from '@/features/affiliate/components/affiliate-empty-state';
import { AffiliateDashboardCard } from '@/features/affiliate/components/affiliate-dashboard-card';
import { AffiliateFinancialSummary } from '@/features/affiliate/components/affiliate-financial-summary';

import { ShoppingBag } from 'lucide-react';

export default function AffiliatePage() {
	const dashboardQuery = useAffiliateDashboardQuery();

	if (!dashboardQuery.data) {
		return null;
	}

	const dashboard = dashboardQuery.data;

	return (
		<div className="space-y-8">
			<section className="grid gap-4 sm:grid-cols-2">
				<AffiliateDashboardCard title="Total de vendas" value={String(dashboard.sales_count)} />

				<AffiliateDashboardCard
					title="Códigos ativos"
					value={`${dashboard.promotion_codes.active}/${dashboard.promotion_codes.total}`}
				/>
			</section>

			{dashboard.financials.length === 0 ? (
				<AffiliateEmptyState
					icon={ShoppingBag}
					title="Ainda não há vendas"
					description="Quando uma compra for atribuída aos seus códigos, os resultados aparecerão aqui."
				/>
			) : (
				dashboard.financials.map((financial) => (
					<AffiliateFinancialSummary key={financial.currency} financial={financial} />
				))
			)}
		</div>
	);
}
