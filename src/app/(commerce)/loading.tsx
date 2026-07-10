import { Loader2 } from 'lucide-react';

export default function Loading() {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-2">
			<p>Loading...</p>
			<Loader2 className="text-primary h-8 w-8 animate-spin" />
			<p>Please wait</p>
		</div>
	);
}
