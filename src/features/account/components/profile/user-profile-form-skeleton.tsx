import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

export function UserProfileFormSkeleton() {
	return (
		<div className="space-y-2">
			<div className="space-y-2">
				<Label>Nome</Label>
				<Skeleton className="h-6 w-full" />
			</div>
			<div className="space-y-2">
				<Label>Telefone</Label>
				<Skeleton className="h-6 w-full" />
			</div>
			<div className="space-y-2">
				<Label>E-mail</Label>
				<Skeleton className="h-6 w-full" />
			</div>
			<div className="space-y-2">
				<Label>CPF</Label>
				<Skeleton className="h-6 w-full" />
			</div>
			<div className="space-y-2">
				<Label>Data nascimento</Label>
				<Skeleton className="h-6 w-full" />
			</div>
		</div>
	);
}
