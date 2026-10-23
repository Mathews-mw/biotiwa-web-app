import { ReactNode } from 'react';

import { AffiliateAreaGuard } from '@/features/affiliate/components/affiliate-area-guard';

export default function AffiliateLayout({ children }: { children: ReactNode }) {
	return <AffiliateAreaGuard>{children}</AffiliateAreaGuard>;
}
