import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';

interface IProps {
	title: string;
	value: string;
	description?: string;
}

export function AffiliateDashboardCard({ title, value, description }: IProps) {
	return (
		<Card>
			<CardHeader className="pb-2">
				<CardDescription>{title}</CardDescription>
			</CardHeader>

			<CardContent>
				<p className="text-2xl font-semibold">{value}</p>

				{description && <p className="text-muted-foreground mt-1 text-xs">{description}</p>}
			</CardContent>
		</Card>
	);
}
