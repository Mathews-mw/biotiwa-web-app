import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { UserRoundX } from 'lucide-react';

export function AffiliateNotFoundState() {
	return (
		<div className="mx-auto flex min-h-125 max-w-xl items-center justify-center">
			<Card className="w-full">
				<CardContent className="flex flex-col items-center px-6 py-12 text-center">
					<div className="bg-muted mb-4 flex size-12 items-center justify-center rounded-full">
						<UserRoundX className="size-6" />
					</div>

					<h1 className="text-xl font-semibold">Você ainda não faz parte do programa de afiliados</h1>

					<p className="text-muted-foreground mt-2 max-w-md text-sm">
						Não encontramos um cadastro de afiliado associado à sua conta.
					</p>

					<div className="mt-6 flex flex-wrap justify-center gap-2">
						<Button asChild>
							<Link href="/biotiwa-club">Quero ser afiliado</Link>
						</Button>

						<Button asChild variant="outline">
							<Link href="/">Voltar para a loja</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
