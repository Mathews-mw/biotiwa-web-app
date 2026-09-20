'use client';

import { useEffect, useState } from 'react';

import { Progress } from '@/components/ui/progress';

import { IconTrolley } from '@tabler/icons-react';
import { PackageCheck, ShoppingCart, Truck } from 'lucide-react';

export function OrderProgress() {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const timer = setTimeout(() => setProgress(100), 1000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="flex w-full items-center gap-2 lg:px-28">
			<div className="flex w-full items-center">
				<div className="text-muted-foreground flex flex-col items-center">
					<ShoppingCart className="text-primary h-5 w-5" />
					<small className="text-center font-bold">Pedido recebido</small>
				</div>

				<Progress value={progress} className="h-1.5" />
			</div>

			<div className="flex w-full items-center">
				<div className="text-muted-foreground flex flex-col items-center">
					<IconTrolley className="text-primary h-5 w-5" />
					<small className="text-center font-bold">Pedido em separação</small>
				</div>

				<Progress value={progress} className="h-1.5" />
			</div>

			<div className="flex w-full items-center justify-center">
				<div className="text-muted-foreground flex flex-col items-center justify-center">
					<Truck className="text-primary h-5 w-5" />
					<small className="text-center font-bold">Mercadoria em trânsito</small>
				</div>

				<Progress value={progress} className="h-1.5" />
			</div>

			<div className="flex items-center">
				<div className="text-muted-foreground flex flex-col items-center">
					<PackageCheck className="text-primary h-5 w-5" />
					<small className="text-center font-bold">Pedido entregue</small>
				</div>
			</div>
		</div>
	);
}
