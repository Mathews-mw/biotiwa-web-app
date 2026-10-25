import { Skeleton } from '@/components/ui/skeleton';

export function AffiliateAreaLoading() {
	return (
		<div className="space-y-6">
			<div className="space-y-2">
				<Skeleton className="h-8 w-52" />
				<Skeleton className="h-4 w-80" />
			</div>

			<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
				{Array.from({
					length: 4,
				}).map((_, index) => (
					<Skeleton key={index} className="h-32" />
				))}
			</div>

			<Skeleton className="h-64 w-full" />
		</div>
	);
}
