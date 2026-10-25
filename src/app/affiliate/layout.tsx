import { ReactNode } from 'react';

import { AffiliateAreaGuard } from '@/features/affiliate/components/affiliate-area-guard';
import { AffiliateHeader } from '@/features/affiliate/components/affiliate-header';

export default function AffiliateLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<AffiliateHeader />
			<AffiliateAreaGuard>{children}</AffiliateAreaGuard>
		</>
	);
}
