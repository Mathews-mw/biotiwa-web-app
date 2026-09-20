import { cn } from '@/lib/utils';

export function TableContainer({ className, ...props }: React.ComponentProps<'div'>) {
	return <div className={cn('bg-card overflow-hidden rounded-lg border', className)} {...props}></div>;
}
