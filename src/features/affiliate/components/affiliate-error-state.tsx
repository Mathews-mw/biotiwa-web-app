import { AlertTriangle } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { Card, CardContent } from '@/components/ui/card';

interface IProps {
	title?: string;
	description?: string;
	onRetry?: () => void;
}

export function AffiliateErrorState({
	title = 'Não foi possível carregar os dados',
	description = 'Ocorreu um problema ao carregar estas informações.',
	onRetry,
}: IProps) {
	return (
		<Card>
			<CardContent className="flex flex-col items-center py-12 text-center">
				<AlertTriangle className="mb-4 size-8" />

				<h2 className="font-semibold">{title}</h2>

				<p className="text-muted-foreground mt-2 text-sm">{description}</p>

				{onRetry && (
					<Button className="mt-5" variant="outline" onClick={onRetry}>
						Tentar novamente
					</Button>
				)}
			</CardContent>
		</Card>
	);
}
