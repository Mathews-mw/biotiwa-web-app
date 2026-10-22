import Link from 'next/link';

import type { IAffiliateDashboard } from '../types/affiliate.types';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AffiliateDashboardCard } from './affiliate-dashboard-card';
import { AffiliateFinancialSummary } from './affiliate-financial-summary';

interface IProps {
	dashboard: IAffiliateDashboard;
}

export function AffiliateDashboardContent({ dashboard }: IProps) {
	return (
		<div className="space-y-8">
			<section className="grid gap-4 sm:grid-cols-2">
				<AffiliateDashboardCard title="Total de vendas" value={String(dashboard.sales_count)} />

				<AffiliateDashboardCard
					title="Códigos ativos"
					value={`${dashboard.promotion_codes.active}/${dashboard.promotion_codes.total}`}
				/>
			</section>

			{dashboard.financials.length === 0 && (
				<Card>
					<CardContent className="py-8">
						<h2 className="font-medium">Ainda não há vendas</h2>

						<p className="text-muted-foreground mt-1 text-sm">
							Compartilhe seu código ou link de afiliado para começar.
						</p>
					</CardContent>
				</Card>
			)}

			{dashboard.financials.map((financial) => (
				<section key={financial.currency} className="space-y-4">
					<AffiliateFinancialSummary financial={financial} />
				</section>
			))}

			<section className="flex gap-3">
				<Button asChild>
					<Link href="/affiliate/sales">Ver vendas</Link>
				</Button>

				<Button asChild variant="outline">
					<Link href="/affiliate/codes">Meus códigos</Link>
				</Button>
			</section>
		</div>
	);
}
