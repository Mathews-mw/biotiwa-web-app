import type { IMarketCode } from '@/features/commerce/types/commerce';

import { Card } from '@/components/ui/card';
import { CheckoutOfferEditor } from '../checkout-offer-editor';

import { ClipboardCheck } from 'lucide-react';

type CheckoutOfferStepProps = {
	marketCode: IMarketCode;
	selectedOfferId: string;
	includeOrderBump: boolean;
	userId: string | null;
};

export function CheckoutOfferStep({ marketCode, selectedOfferId, includeOrderBump, userId }: CheckoutOfferStepProps) {
	return (
		<div className="grid gap-5">
			<Card className="border-white/10 bg-white/4 p-6 text-white">
				<div className="flex items-start gap-4">
					<div className="bg-brand-gold/15 text-brand-gold flex size-10 shrink-0 items-center justify-center rounded-full">
						<ClipboardCheck className="size-5" />
					</div>

					<div>
						<h2 className="text-xl font-medium">Revise sua oferta</h2>

						<p className="mt-2 text-sm leading-6 text-white/45">
							Antes de seguir, confira o kit escolhido e a oferta adicional. Você pode alterar essa seleção agora sem
							sair do checkout.
						</p>
					</div>
				</div>
			</Card>

			<CheckoutOfferEditor
				marketCode={marketCode}
				selectedOfferId={selectedOfferId}
				includeOrderBump={includeOrderBump}
				userId={userId}
			/>
		</div>
	);
}
