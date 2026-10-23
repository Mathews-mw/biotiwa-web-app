'use client';

import { useAffiliateDashboardQuery } from '@/features/affiliate/hooks/use-affiliate-dashboard-query';
import { useAffiliatePromotionCodesQuery } from '@/features/affiliate/hooks/use-affiliate-promotion-codes-query';

import { Skeleton } from '@/components/ui/skeleton';
import { AffiliateEmptyState } from '@/features/affiliate/components/affiliate-empty-state';
import { AffiliateErrorState } from '@/features/affiliate/components/affiliate-error-state';
import { AffiliatePromotionCodeCard } from '@/features/affiliate/components/affiliate-promotion-code-card';

import { Tags } from 'lucide-react';

export default function AffiliateCodesPage() {
	const dashboardQuery = useAffiliateDashboardQuery();

	const codesQuery = useAffiliatePromotionCodesQuery();

	if (codesQuery.isPending) {
		return (
			<div className="grid gap-4 md:grid-cols-2">
				<Skeleton className="h-64" />
				<Skeleton className="h-64" />
			</div>
		);
	}

	if (codesQuery.isError) {
		return <AffiliateErrorState title="Não foi possível carregar seus códigos" onRetry={() => codesQuery.refetch()} />;
	}

	const { promotion_codes } = codesQuery.data;

	const affiliateStatus = dashboardQuery.data?.affiliate.status;

	if (!affiliateStatus) {
		return null;
	}

	if (promotion_codes.length === 0) {
		return (
			<AffiliateEmptyState
				icon={Tags}
				title="Nenhum código disponível"
				description="Você ainda não possui códigos ou campanhas de afiliado."
			/>
		);
	}

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-xl font-semibold">Meus códigos</h2>

				<p className="text-muted-foreground text-sm">Compartilhe seus códigos ou links personalizados.</p>
			</div>

			<div className="grid gap-4 lg:grid-cols-2">
				{promotion_codes.map((promotionCodes) => (
					<AffiliatePromotionCodeCard
						key={promotionCodes.promotion_code.id}
						promotion={promotionCodes.promotion_code}
						affiliateStatus={affiliateStatus}
						commissionRate={promotionCodes.affiliate_promotion_code.commission_rate}
					/>
				))}
			</div>
		</div>
	);
}
