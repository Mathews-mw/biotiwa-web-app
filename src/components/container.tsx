import { cn } from '@/lib/utils';

export function Container({ className, ...props }: React.ComponentProps<'div'>) {
	return <div className={cn('bg-card flex flex-col gap-4 rounded-lg p-4 shadow-sm', className)} {...props} />;
}
