import { Suspense } from 'react';

import { AuthGuard } from '@/features/auth/components/auth-guard';
import { ProfileScreen } from '@/features/account/components/profile-screen';

export default function AccountPage() {
	return (
		<Suspense fallback={null}>
			<AuthGuard>
				<ProfileScreen />
			</AuthGuard>
		</Suspense>
	);
}
