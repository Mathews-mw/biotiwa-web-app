import { cn } from '@/lib/utils';

import type { ICurrencyCode, IMarketCode, IOffer } from '../types/commerce-entity-types';

import { formatMoney } from '../lib/format-money';
import { getOfferTotalQuantity } from '../lib/get-offer-total-quantity';
import { useTrackEvent } from '@/features/tracking/hooks/use-track-event';

interface IProps {
	offer: IOffer;
	locale: string;
	currency: ICurrencyCode;
	selectedMarketCode: IMarketCode;
	isSelected: boolean;
	onSetSelectedOfferId: (offerId: string) => void;
}

export function OfferOption({ offer, currency, locale, selectedMarketCode, isSelected, onSetSelectedOfferId }: IProps) {
	const { track } = useTrackEvent();

	const totalOfferQuantity = getOfferTotalQuantity(offer);
	const originalAmount = offer.unit_amount * totalOfferQuantity;

	const finalAmount = originalAmount - Math.round(originalAmount * (offer.discount_percent / 100));

	return (
		<button
			key={offer.id}
			type="button"
			onClick={() => {
				onSetSelectedOfferId(offer.id);

				track({
					eventType: 'offer_selected',
					market: selectedMarketCode,
					payload: {
						offerId: offer.id,
						offerName: offer.name,
						quantity: totalOfferQuantity,
						discountPercent: offer.discount_percent,
					},
				});
			}}
			className={cn(
				'relative rounded-3xl border p-5 text-left transition-all',
				isSelected ? 'border-brand-gold bg-white/8' : 'border-white/10 bg-white/2.5 hover:border-white/25'
			)}
		>
			{offer.is_highlighted ? (
				<span className="bg-brand-gold absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-medium text-[#16091f]">
					Mais escolhido
				</span>
			) : null}

			<h3 className="text-xl font-medium">{offer.name}</h3>

			<p className="mt-2 max-w-md text-sm leading-6 text-white/50">{offer.description}</p>

			<div className="mt-5 flex flex-wrap items-end gap-3">
				<span className="text-3xl font-semibold tracking-[-0.04em]">
					{formatMoney({
						amount: finalAmount,
						currency,
						locale,
					})}
				</span>

				{offer.discount_percent > 0 ? (
					<>
						<span className="pb-1 text-sm text-white/35 line-through">
							{formatMoney({
								amount: originalAmount,
								currency,
								locale,
							})}
						</span>

						<span className="text-brand-gold pb-1 text-sm font-medium">{offer.discount_percent}% OFF</span>
					</>
				) : null}
			</div>
		</button>
	);
}
