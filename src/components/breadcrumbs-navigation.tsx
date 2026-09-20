'use client';

import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';

const breadcrumbMap: Record<string, string> = {
	store: 'Loja',
	products: 'Produtos',
	details: 'Transporter Details',
	cart: 'Carrinho',
	checkout: 'Finalizar Compra',
};

export default function Breadcrumbs() {
	const segments = useSelectedLayoutSegments();

	// constroi os caminhos acumulados
	const crumbs = segments
		.filter((seg) => !seg.startsWith('[') && !seg.endsWith(']')) // ignora [id], [slug] etc.
		.map((segment, index) => {
			const href = '/' + segments.slice(0, index + 1).join('/');
			const label = breadcrumbMap[segment] ?? decodeURIComponent(segment);

			return { href, label };
		});

	if (crumbs.length === 0) return null;

	return (
		<nav className="flex items-center space-x-2 text-sm text-gray-600">
			<Link href="/" className="hover:underline">
				Home
			</Link>
			{crumbs.map((crumb, index) => (
				<span key={crumb.href} className="flex items-center space-x-2">
					<span className="text-gray-400">/</span>
					{index === crumbs.length - 1 ? (
						<span className="text-primary font-medium">{crumb.label}</span>
					) : (
						<Link href={crumb.href} className="hover:underline">
							{crumb.label}
						</Link>
					)}
				</span>
			))}
		</nav>
	);
}
