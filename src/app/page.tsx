import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { FaqSection } from '@/components/landing/faq-section';
import { HeroSection } from '@/components/landing/hero-section';
import { ScienceSection } from '@/components/landing/science-section';
import { BenefitsSection } from '@/components/landing/benefits-section';
import { FinalCtaSection } from '@/components/landing/final-cta-section';
import { ManifestoSection } from '@/components/landing/manifesto-section';
import { IngredientsSection } from '@/components/landing/ingredients-section';
import { ProductStorySection } from '@/components/landing/product-story-section';
import { ProductDetailsSection } from '@/components/landing/product-details-section';
import { ProductOfferSection } from '@/features/commerce/components/product-offer-section';

export default function HomePage() {
	return (
		<>
			<SiteHeader />

			<main className="overflow-clip">
				<HeroSection />
				<ManifestoSection />
				<ProductStorySection />
				<BenefitsSection />
				<IngredientsSection />
				<ScienceSection />
				<ProductDetailsSection />
				<ProductOfferSection />
				<FaqSection />
				<FinalCtaSection />
			</main>

			<SiteFooter />
		</>
	);
}
