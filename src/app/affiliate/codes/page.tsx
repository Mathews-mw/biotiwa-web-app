'use client';

import { useAffiliateDashboardQuery } from '@/features/affiliate/hooks/use-affiliate-dashboard-query';
import { useAffiliatePromotionCodeSettingsQuery } from '@/features/affiliate/hooks/use-affiliate-queries';
import { useAffiliatePromotionCodesQuery } from '@/features/affiliate/hooks/use-affiliate-promotion-codes-query';

import { Skeleton } from '@/components/ui/skeleton';
import { AffiliateEmptyState } from '@/features/affiliate/components/affiliate-empty-state';
import { AffiliateErrorState } from '@/features/affiliate/components/affiliate-error-state';
import { AffiliatePromotionCodeCard } from '@/features/affiliate/components/affiliate-promotion-code-card';
import { CreateAffiliatePromotionCodeDialog } from '@/features/affiliate/components/create-affiliate-promotion-code-dialog';

import { Tags } from 'lucide-react';

export default function AffiliateCodesPage() {
	const dashboardQuery = useAffiliateDashboardQuery();
	const codesQuery = useAffiliatePromotionCodesQuery({ redemptionStatus: 'REDEEMED' });
	const affiliatePromotionCodeSettingsQuery = useAffiliatePromotionCodeSettingsQuery('BR');

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

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-xl font-semibold">Meus códigos</h2>

				<p className="text-muted-foreground text-sm">Crie e compartilhe seus códigos ou links personalizados.</p>
			</div>

			<div className="flex w-full items-center justify-between">
				{affiliatePromotionCodeSettingsQuery.data && (
					<p className="text-muted-foreground text-sm">
						{affiliatePromotionCodeSettingsQuery.data.active_codes}/
						{affiliatePromotionCodeSettingsQuery.data.settings.max_active_codes_per_affiliate} códigos ativos
					</p>
				)}

				{affiliatePromotionCodeSettingsQuery.data && (
					<CreateAffiliatePromotionCodeDialog
						marketCode="BR"
						affiliatePromotionCodeSettings={affiliatePromotionCodeSettingsQuery.data}
					/>
				)}
			</div>

			{promotion_codes.length === 0 ? (
				<AffiliateEmptyState
					icon={Tags}
					title="Nenhum código disponível"
					description="Você ainda não possui códigos ou campanhas de afiliado."
				/>
			) : (
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
			)}
		</div>
	);
}
