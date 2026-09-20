'use client';

import z from 'zod';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useUserOrdersQuery } from '@/features/order/hooks/use-orders-query';

import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/pagination';
import { OrderItemCard } from '@/features/order/components/order-item-card';

import { ArrowLeft } from 'lucide-react';
import { IconPackage } from '@tabler/icons-react';

export function UserOrdersScreen() {
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);
	const pathname = usePathname();
	const { replace } = useRouter();

	const currentPageParams = z.coerce.number().parse(searchParams.get('page') ?? '1');
	const perPageParams = z.union([z.literal('all'), z.coerce.number()]).parse(searchParams.get('perPage') ?? '10');
	const searchQueryParams = searchParams.get('search') ?? undefined;
	const orderByParams = searchParams.get('orderBy') ?? undefined;

	const { data: userOrdersData } = useUserOrdersQuery({
		options: { page: currentPageParams, perPage: perPageParams, search: searchQueryParams },
	});

	function handlePaginate(page: number) {
		params.set('page', page.toString());
		replace(`${pathname}?${params.toString()}`);
	}

	return (
		<section className="my-8 space-y-8">
			<div className="flex w-full items-center justify-between">
				<div className="flex items-center gap-2">
					<IconPackage className="text-brand-acai size-9" />
					<h1 className="text-jaguar text-3xl font-medium tracking-tight">Meus pedidos</h1>
				</div>

				<Button variant="link" className="text-brand-acai hover:text-brand-violet">
					<ArrowLeft />
					<Link href="/">Voltar para o início</Link>
				</Button>
			</div>

			<p className="text-muted-foreground mt-4">Esta área terá o histórico e detalhes dos pedidos do usuário.</p>

			<div className="flex w-full flex-col gap-8">
				{userOrdersData &&
					userOrdersData.orders.map((item) => {
						return <OrderItemCard key={item.id} orderDetails={item} />;
					})}
			</div>

			{userOrdersData && (
				<div className="flex w-full justify-end">
					<Pagination
						currentPage={userOrdersData.pagination.page}
						perPage={userOrdersData.pagination.per_page}
						totalCount={userOrdersData.pagination.total_occurrences}
						totalPages={userOrdersData.pagination.total_pages}
						onPageChange={(page) => handlePaginate(page)}
					/>
				</div>
			)}
		</section>
	);
}
