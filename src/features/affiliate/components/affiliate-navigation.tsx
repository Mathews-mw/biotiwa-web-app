'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';

import { BarChart3, BadgeDollarSign, Tags } from 'lucide-react';

const navigation = [
	{
		href: '/affiliate',
		label: 'Visão geral',
		icon: BarChart3,
		exact: true,
	},
	{
		href: '/affiliate/sales',
		label: 'Vendas',
		icon: BadgeDollarSign,
	},
	{
		href: '/affiliate/codes',
		label: 'Códigos',
		icon: Tags,
	},
];

export function AffiliateNavigation() {
	const pathname = usePathname();

	return (
		<nav className="flex flex-wrap gap-2">
			{navigation.map((item) => {
				const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);

				const Icon = item.icon;

				return (
					<Button key={item.href} asChild variant={active ? 'default' : 'outline'} size="sm">
						<Link href={item.href}>
							<Icon />

							{item.label}
						</Link>
					</Button>
				);
			})}
		</nav>
	);
}
