import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

export function PaymentSummarySkeleton() {
	return (
		<div className="bg-background h-min space-y-4 rounded-lg border p-6 shadow-sm">
			<div className="flex items-center gap-2 text-nowrap">
				<span>Forma de pagamento: </span>
				<Skeleton className="h-3 w-full" />
			</div>

			<Separator />

			<div className="flex flex-col space-y-1">
				<span>Endereço de entrega: </span>
				<Skeleton className="h-3 w-full" />
				<Skeleton className="h-3 w-full" />
				<Skeleton className="h-3 w-full" />
			</div>

			<Separator />

			<div className="space-y-2 rounded border p-2 text-sm">
				<div className="flex w-full justify-between">
					<span>Total produto(s)</span>
					<Skeleton className="h-3.5 w-24" />
				</div>
				<div className="flex w-full justify-between">
					<span>Descontos</span>
					<Skeleton className="h-3.5 w-24" />
				</div>
				<div className="flex w-full justify-between">
					<span>Entrega</span>
					<Skeleton className="h-3.5 w-24" />
				</div>

				<Separator />

				<div className="flex w-full justify-between rounded font-bold">
					<span>Total</span>
					<Skeleton className="h-4 w-24" />
				</div>
			</div>
		</div>
	);
}
