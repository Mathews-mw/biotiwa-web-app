import { SiteFooter } from '@/components/layout/site-footer';
import { AccountHeader } from '@/features/account/components/account-header';
import { ReactNode } from 'react';

export default function AccountLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex min-h-svh flex-col">
			<AccountHeader />

			<main className="mx-auto w-full max-w-7xl grow px-4 py-0 lg:px-20">{children}</main>

			<SiteFooter />
		</div>
	);
}
