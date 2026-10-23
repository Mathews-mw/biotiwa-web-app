import { HeroSection } from './components/hero-section';
import { AuthGuard } from '@/features/auth/components/auth-guard';
import { AffiliationsTypesSection } from './components/affiliations-types-section';

export default function BiotiwaClubPage() {
	return (
		<div className="overflow-clip">
			<HeroSection />
			<AffiliationsTypesSection />
		</div>
	);
}
