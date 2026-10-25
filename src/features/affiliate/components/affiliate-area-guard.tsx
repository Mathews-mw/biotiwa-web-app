'use client';

import type { ReactNode } from 'react';

import { useAffiliateDashboardQuery } from '../hooks/use-affiliate-dashboard-query';
import { isAffiliateNotFoundError } from '../http-requests/errors/is-affiliate-not-found-error';

import { AffiliateErrorState } from './affiliate-error-state';
import { AffiliateNavigation } from './affiliate-navigation';
import { AffiliateAreaLoading } from './affiliate-area-loading';
import { AffiliateStatusBadge } from './affiliate-status-badge';
import { AffiliateStatusNotice } from './affiliate-status-notice';
import { AffiliateNotFoundState } from './affiliate-not-found-state';
import { Separator } from '@/components/ui/separator';

interface Props {
	children: ReactNode;
}

export function AffiliateAreaGuard({ children }: Props) {
	const dashboardQuery = useAffiliateDashboardQuery();

	if (dashboardQuery.isPending) {
		return <AffiliateAreaLoading />;
	}

	if (dashboardQuery.isError) {
		if (isAffiliateNotFoundError(dashboardQuery.error)) {
			return <AffiliateNotFoundState />;
		}

		return <AffiliateErrorState onRetry={() => dashboardQuery.refetch()} />;
	}

	const { affiliate } = dashboardQuery.data;

	return (
		<div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8">
			<div className="space-y-4">
				<div className="flex flex-wrap items-center justify-between gap-3">
					<div>
						<div className="flex items-center gap-3">
							<h1 className="text-2xl font-semibold">Área do afiliado</h1>

							<AffiliateStatusBadge status={affiliate.status} />
						</div>

						<p className="text-muted-foreground mt-1 text-sm">Acompanhe suas vendas, comissões e campanhas.</p>
					</div>
				</div>

				<AffiliateNavigation />

				<Separator />
			</div>

			<AffiliateStatusNotice status={affiliate.status} />

			{children}
		</div>
	);
}
