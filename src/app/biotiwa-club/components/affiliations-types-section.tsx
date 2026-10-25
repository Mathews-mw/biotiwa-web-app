'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export function AffiliationsTypesSection() {
	const router = useRouter();

	return (
		<section className="bg-[#f5f7ee]">
			<div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
				<Card className="relative max-w-sm pt-0">
					<img
						src="/images/biotiwa_affiliate.png"
						alt="Biotiwa Affiliate"
						className="aspect-auto w-full object-cover"
					/>
					<CardHeader>
						<CardTitle>Revender produtos Biotiwa</CardTitle>
						<CardDescription>
							Adquire produtos BIOTIWA para revenda por conta própria, auferindo lucro na diferença entre o preço de
							aquisição e o de revenda.
						</CardDescription>
					</CardHeader>
					<CardFooter>
						<Button className="w-full" onClick={() => router.push('/biotiwa-club/register')}>
							Quero ser revendedor
						</Button>
					</CardFooter>
				</Card>

				<Card className="relative max-w-sm pt-0">
					<img src="/images/biotiwa_promoter.png" alt="Biotiwa Promoter" className="aspect-auto w-full object-cover" />
					<CardHeader>
						<CardTitle>Divulgar produtos Biotiwa</CardTitle>
						<CardDescription>
							Divulga produtos BIOTIWA, recebendo comissão do percentual sobre cada unidade efetivamente vendida através
							do código/cupom.
						</CardDescription>
					</CardHeader>
					<CardFooter>
						<Button onClick={() => router.push('/biotiwa-club/register')} className="w-full">
							Quero ser divulgador
						</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
