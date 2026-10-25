import { Suspense } from 'react';

import { AuthGuard } from '@/features/auth/components/auth-guard';
import { RegisterAffiliateForm } from '../components/register-affiliate-form';

export default function AffiliateRegisterPage() {
	return (
		<Suspense fallback={null}>
			<AuthGuard>
				<RegisterAffiliateForm />
			</AuthGuard>
		</Suspense>
	);
}
