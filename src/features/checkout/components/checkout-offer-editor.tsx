'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, PencilLine } from 'lucide-react';

import type { IMarketCode } from '@/features/commerce/types/commerce';

import { cn } from '@/lib/utils';
import { buildCheckoutPath } from '../lib/build-checkout-path';
import { formatMoney } from '@/features/commerce/lib/format-money';
import { useTrackEvent } from '@/features/tracking/hooks/use-track-event';
import { useSaveCartSelectionMutation } from '@/features/cart/hooks/use-cart-queries';
import { usePublicOffersQuery } from '@/features/commerce/hooks/use-commerce-queries';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

type CheckoutOfferEditorProps = {
	marketCode: IMarketCode;
	selectedOfferId: string;
	includeOrderBump: boolean;
	userId: string | null;
};

export function CheckoutOfferEditor({
	marketCode,
	selectedOfferId,
	includeOrderBump,
	userId,
}: CheckoutOfferEditorProps) {
	const router = useRouter();

	const [isEditing, setIsEditing] = useState(false);

	const offersQuery = usePublicOffersQuery({
		market: marketCode,
	});

	const saveCartSelectionMutation = useSaveCartSelectionMutation();
	const { track } = useTrackEvent();

	const market = offersQuery.data?.market;
	const offers = offersQuery.data?.offers ?? [];
	const orderBump = offersQuery.data?.orderBump ?? null;

	const selectedOffer = offers.find((offer) => offer.id === selectedOfferId) ?? null;

	async function applySelection(input: { offerId: string; includeOrderBump: boolean }) {
		if (!market) {
			return;
		}

		const nextPath = buildCheckoutPath({
			market: marketCode,
			offerId: input.offerId,
			includeOrderBump: input.includeOrderBump,
		});

		if (userId) {
			await saveCartSelectionMutation.mutateAsync({
				userId,
				market: marketCode,
				offerId: input.offerId,
				includeOrderBump: input.includeOrderBump,
			});
		}

		if (input.offerId !== selectedOfferId) {
			const nextOffer = offers.find((offer) => offer.id === input.offerId);

			track({
				eventType: 'offer_selected',
				market: marketCode,
				payload: {
					source: 'checkout',
					offerId: input.offerId,
					offerName: nextOffer?.name,
					quantity: nextOffer?.quantity,
					discountPercent: nextOffer?.discountPercent,
				},
			});
		}

		if (input.includeOrderBump !== includeOrderBump && orderBump) {
			track({
				eventType: 'order_bump_changed',
				market: marketCode,
				payload: {
					source: 'checkout',
					orderBumpId: orderBump.id,
					orderBumpName: orderBump.name,
					included: input.includeOrderBump,
				},
			});
		}

		router.replace(nextPath, {
			scroll: false,
		});
	}

	if (offersQuery.isLoading) {
		return (
			<Card className="border-white/10 bg-white/4 p-6 text-white">
				<p className="text-sm text-white/45">Carregando oferta...</p>
			</Card>
		);
	}

	if (!market || !selectedOffer) {
		return (
			<Card className="border-red-400/20 bg-red-500/10 p-6 text-red-100">
				<p className="text-sm">Não foi possível carregar a seleção do carrinho.</p>
			</Card>
		);
	}

	const originalAmount = selectedOffer.unitAmount * selectedOffer.quantity;
	const discountAmount = Math.round(originalAmount * (selectedOffer.discountPercent / 100));
	const finalAmount = originalAmount - discountAmount;

	return (
		<Card className="border-white/10 bg-white/4 p-6 text-white">
			<div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
				<div>
					<p className="text-brand-gold text-xs font-medium tracking-[0.25em] uppercase">Sua seleção</p>

					<h2 className="mt-3 text-2xl font-medium">{selectedOffer.name}</h2>

					<p className="mt-2 text-sm leading-6 text-white/45">{selectedOffer.description}</p>

					<div className="mt-4 flex flex-wrap items-end gap-3">
						<span className="text-brand-gold text-2xl font-semibold tracking-[-0.04em]">
							{formatMoney({
								amount: finalAmount,
								currency: market.currency,
								locale: market.locale,
							})}
						</span>

						{selectedOffer.discountPercent > 0 ? (
							<>
								<span className="pb-1 text-sm text-white/35 line-through">
									{formatMoney({
										amount: originalAmount,
										currency: market.currency,
										locale: market.locale,
									})}
								</span>

								<span className="text-brand-gold pb-1 text-sm font-medium">{selectedOffer.discountPercent}% OFF</span>
							</>
						) : null}
					</div>

					{includeOrderBump && orderBump ? (
						<Badge className="bg-brand-gold/15 text-brand-gold hover:bg-brand-gold/15 mt-4 rounded-full">
							Com oferta adicional
						</Badge>
					) : (
						<Badge className="mt-4 rounded-full bg-white/10 text-white/55 hover:bg-white/10">
							Sem oferta adicional
						</Badge>
					)}
				</div>

				<Button
					type="button"
					variant="outline"
					onClick={() => setIsEditing((current) => !current)}
					className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
				>
					<PencilLine className="size-4" />
					{isEditing ? 'Fechar edição' : 'Alterar'}
				</Button>
			</div>

			{isEditing ? (
				<>
					<Separator className="my-6 bg-white/10" />

					<div>
						<p className="text-sm font-medium text-white/60">Alterar plano</p>

						<div className="mt-4 grid gap-3">
							{offers.map((offer) => {
								const isSelected = offer.id === selectedOfferId;

								const offerOriginalAmount = offer.unitAmount * offer.quantity;
								const offerDiscountAmount = Math.round(offerOriginalAmount * (offer.discountPercent / 100));
								const offerFinalAmount = offerOriginalAmount - offerDiscountAmount;

								return (
									<button
										key={offer.id}
										type="button"
										disabled={saveCartSelectionMutation.isPending}
										onClick={() => {
											void applySelection({
												offerId: offer.id,
												includeOrderBump,
											});
										}}
										className={cn(
											'flex items-center justify-between gap-4 rounded-2xl border p-4 text-left transition-all',
											isSelected
												? 'border-brand-gold bg-brand-gold/10'
												: 'border-white/10 bg-white/2.5 hover:border-white/25'
										)}
									>
										<span>
											<span className="block font-medium">{offer.name}</span>

											<span className="mt-1 block text-sm text-white/45">{offer.description}</span>
										</span>

										<span className="flex items-center gap-3">
											<span className="text-brand-gold font-semibold whitespace-nowrap">
												{formatMoney({
													amount: offerFinalAmount,
													currency: market.currency,
													locale: market.locale,
												})}
											</span>

											{isSelected ? <Check className="size-4" /> : null}
										</span>
									</button>
								);
							})}
						</div>
					</div>

					{orderBump ? (
						<>
							<Separator className="my-6 bg-white/10" />

							<div>
								<p className="text-sm font-medium text-white/60">Oferta adicional</p>

								<button
									type="button"
									disabled={saveCartSelectionMutation.isPending}
									onClick={() => {
										void applySelection({
											offerId: selectedOfferId,
											includeOrderBump: !includeOrderBump,
										});
									}}
									className={cn(
										'mt-4 flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all',
										includeOrderBump
											? 'border-brand-gold bg-brand-gold/10'
											: 'border-white/10 bg-white/2.5 hover:border-white/25'
									)}
								>
									<span
										className={cn(
											'mt-1 flex size-5 shrink-0 items-center justify-center rounded-md border',
											includeOrderBump ? 'border-brand-gold bg-brand-gold' : 'border-white/25'
										)}
									>
										{includeOrderBump ? <span className="size-2 rounded-sm bg-[#16091f]" /> : null}
									</span>

									<span className="flex-1">
										<span className="block font-medium">{orderBump.name}</span>

										<span className="mt-1 block text-sm leading-6 text-white/45">{orderBump.description}</span>

										<span className="text-brand-gold mt-3 block font-semibold">
											+
											{formatMoney({
												amount: orderBump.unitAmount,
												currency: market.currency,
												locale: market.locale,
											})}
										</span>
									</span>
								</button>
							</div>
						</>
					) : null}

					{saveCartSelectionMutation.isError ? (
						<p className="mt-5 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
							Não foi possível atualizar o carrinho. Tente novamente.
						</p>
					) : null}
				</>
			) : null}
		</Card>
	);
}
