'use client';

import { useState } from 'react';

import { useAffiliateSalesQuery } from '@/features/affiliate/hooks/use-affiliate-sales-query';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { AffiliateEmptyState } from '@/features/affiliate/components/affiliate-empty-state';
import { AffiliateErrorState } from '@/features/affiliate/components/affiliate-error-state';
import { AffiliateSalesTable } from '@/features/affiliate/components/affiliate-sales-table';

import { BadgeDollarSign } from 'lucide-react';

export default function AffiliateSalesPage() {
	const [page, setPage] = useState(1);

	const salesQuery = useAffiliateSalesQuery({
		page,
		perPage: 10,
	});

	if (salesQuery.isPending) {
		return (
			<div className="space-y-4">
				<Skeleton className="h-8 w-40" />

				<Skeleton className="h-80 w-full" />
			</div>
		);
	}

	if (salesQuery.isError) {
		return <AffiliateErrorState title="Não foi possível carregar suas vendas" onRetry={() => salesQuery.refetch()} />;
	}

	const { pagination, sales } = salesQuery.data;

	if (pagination.total_occurrences === 0) {
		return (
			<AffiliateEmptyState
				icon={BadgeDollarSign}
				title="Nenhuma venda encontrada"
				description="Suas vendas atribuídas a códigos de afiliado aparecerão aqui."
			/>
		);
	}

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-xl font-semibold">Vendas</h2>
			</div>

			<AffiliateSalesTable sales={sales} />

			<div className="flex items-center justify-between gap-4">
				<p className="text-muted-foreground text-sm">
					Página {pagination.page} de {pagination.total_pages}
				</p>

				<div className="flex gap-2">
					<Button
						type="button"
						variant="outline"
						disabled={page <= 1 || salesQuery.isFetching}
						onClick={() => setPage((current) => current - 1)}
					>
						Anterior
					</Button>

					<Button
						type="button"
						variant="outline"
						disabled={pagination.page >= pagination.total_pages || salesQuery.isFetching}
						onClick={() => setPage((current) => current + 1)}
					>
						Próxima
					</Button>
				</div>
			</div>
		</div>
	);
}
