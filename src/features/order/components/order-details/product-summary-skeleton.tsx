import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { OrderProgressSkeleton } from '../order-progress.skeleton';

export function ProductSummarySkeleton() {
	return (
		<div className="bg-background col-span-2 space-y-8 rounded-lg border p-6 shadow-sm">
			<div className="flex w-full flex-col-reverse justify-between gap-4 lg:flex-row lg:items-center lg:gap-0">
				<div className="text-sm font-semibold">
					<div className="flex items-center gap-1">
						<h4>Pedido:</h4>
						<Skeleton className="h-3 w-55" />
					</div>
					<div className="flex items-center gap-1">
						<span>Data: </span>
						<Skeleton className="h-3 w-24" />
					</div>
				</div>

				<Skeleton className="h-4 w-28" />
			</div>

			<Separator />

			{Array.from([1, 2]).map((_, i) => {
				return (
					<div key={i} className="flex w-full justify-between gap-2">
						<div className="flex gap-3">
							<Skeleton className="h-16.25 w-16.25" />

							<div className="flex flex-col gap-2">
								<Skeleton className="h-3 w-36 lg:w-96" />
								<Skeleton className="h-3 w-32" />
							</div>
						</div>

						<Skeleton className="h-4 w-24 lg:w-28" />
					</div>
				);
			})}

			<Separator />

			<div className="flex w-full flex-col justify-center gap-2 lg:flex-row lg:justify-end lg:gap-4">
				<Button variant="secondary" disabled>
					Ajuda com o pedido
				</Button>
				<Button variant="outline" disabled>
					Rastreio detalhado
				</Button>
			</div>

			<OrderProgressSkeleton />
		</div>
	);
}
