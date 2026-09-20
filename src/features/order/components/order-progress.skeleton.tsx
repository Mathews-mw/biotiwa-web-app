import { Skeleton } from '@/components/ui/skeleton';
import { PackageCheck, ShoppingCart, Truck } from 'lucide-react';
import { PackageTrolleyIcon } from '@/components/custom-icons/package-trolley-icon';

export function OrderProgressSkeleton() {
	return (
		<div className="flex w-full items-center gap-2 lg:px-28">
			<div className="flex w-full items-center">
				<div className="text-muted-foreground flex flex-col items-center">
					<ShoppingCart className="h-5 w-5" />
					<small className="text-center font-bold">Pedido recebido</small>
				</div>

				<Skeleton className="h-1.5 w-full" />
			</div>

			<div className="flex w-full items-center">
				<div className="text-muted-foreground flex flex-col items-center">
					<PackageTrolleyIcon size={20} className="fill-muted-foreground" />
					<small className="text-center font-bold">Pedido em separação</small>
				</div>

				<Skeleton className="h-1.5 w-full" />
			</div>

			<div className="flex w-full items-center justify-center">
				<div className="text-muted-foreground flex flex-col items-center justify-center">
					<Truck className="h-5 w-5" />
					<small className="text-center font-bold">Mercadoria em trânsito</small>
				</div>

				<Skeleton className="h-1.5 w-full" />
			</div>

			<div className="flex items-center">
				<div className="text-muted-foreground flex flex-col items-center">
					<PackageCheck className="h-5 w-5" />
					<small className="text-center font-bold">Pedido entregue</small>
				</div>
			</div>
		</div>
	);
}
