import './globals.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';

import { cn } from '@/lib/utils';

import { QueryProvider } from '@/providers/query-provider';
import { ConsentProvider } from '@/features/consent/context/consent-provider';
import { AuthSessionSync } from '@/features/auth/components/auth-session-sync';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'BIOTIWA - Açai Pulse',
	description: 'A força da Amazônia em uma nova forma.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="pt-BR"
			className={cn('h-full', 'antialiased', geistSans.variable, geistMono.variable, 'font-sans', inter.variable)}
		>
			<body className="flex min-h-full flex-col">
				<QueryProvider>
					<AuthSessionSync />

					<ConsentProvider>{children}</ConsentProvider>
				</QueryProvider>
			</body>
		</html>
	);
}
