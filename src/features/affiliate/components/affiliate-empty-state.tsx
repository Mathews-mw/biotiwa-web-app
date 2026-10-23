import type { LucideIcon } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

import { Inbox } from 'lucide-react';

interface IProps {
	title: string;
	description: string;
	icon?: LucideIcon;
}

export function AffiliateEmptyState({ title, description, icon: Icon = Inbox }: IProps) {
	return (
		<Card>
			<CardContent className="flex flex-col items-center py-12 text-center">
				<div className="bg-muted mb-4 flex size-12 items-center justify-center rounded-full">
					<Icon className="size-6" />
				</div>

				<h2 className="font-medium">{title}</h2>

				<p className="text-muted-foreground mt-1 max-w-md text-sm">{description}</p>
			</CardContent>
		</Card>
	);
}
