import { faqItems } from '@/content/landing-page';
import { FadeIn } from '@/components/motion/fade-in';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export function FaqSection() {
	return (
		<section id="faq" className="scroll-mt-24 bg-[#130917] px-6 py-28 text-white lg:px-10 lg:py-40">
			<div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
				<FadeIn>
					<p className="text-brand-gold text-xs font-medium tracking-[0.3em] uppercase">Perguntas frequentes</p>

					<h2 className="mt-6 max-w-md text-5xl leading-none font-medium tracking-[-0.055em] text-balance">
						Informação clara, desde o início.
					</h2>

					<p className="mt-7 max-w-md text-base leading-7 text-white/50">
						As respostas finais deverão ser revisadas pelo cliente antes da publicação oficial.
					</p>
				</FadeIn>

				<FadeIn delay={0.1}>
					<Accordion type="multiple" defaultValue={['faq-0']} className="border-t border-white/10">
						{faqItems.map((item, index) => (
							<AccordionItem key={item.question} value={`faq-${index}`} className="border-b border-white/10">
								<AccordionTrigger className="py-7 text-start text-lg font-normal text-white hover:no-underline sm:text-xl">
									{item.question}
								</AccordionTrigger>

								<AccordionContent className="max-w-2xl pb-7 text-base leading-8 text-white/50">
									{item.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</FadeIn>
			</div>
		</section>
	);
}
