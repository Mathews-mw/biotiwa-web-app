'use client';

import Image from 'next/image';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import type { IMarketCode } from '../types/commerce-entity-types';

import { cn } from '@/lib/utils';
import { formatMoney } from '../lib/format-money';
import { useTrackEvent } from '@/features/tracking/hooks/use-track-event';
import { useAddCartItemMutation } from '@/features/cart/hooks/use-cart-queries';
import { useCheckoutQuoteQuery, useGetPublicOffersQuery } from '../hooks/use-commerce-queries';

import { SummaryRow } from './summary-row';
import { OfferOption } from './offer-option';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { OrderBumpOption } from './order-bump-option';
import { buildCheckoutStartPath } from '@/features/checkout/lib/build-checkout-start-path';

const availableMarkets = [
	{
		code: 'BR',
		label: 'Brasil',
		currency: 'BRL',
	},
	{
		code: 'US',
		label: 'United States',
		currency: 'USD',
	},
] as const;

export function ProductOfferSection() {
	const router = useRouter();

	const [selectedMarketCode, setSelectedMarketCode] = useState<IMarketCode>('BR');

	const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
	const [includeOrderBump, setIncludeOrderBump] = useState(false);

	const { track } = useTrackEvent();

	const addCartItemMutation = useAddCartItemMutation();

	const offersQuery = useGetPublicOffersQuery({
		market: selectedMarketCode,
	});

	const currentMarket = offersQuery.data?.market;
	const product = offersQuery.data?.product;
	const currentOrderBump = offersQuery.data?.order_bump ?? null;
	const marketOffers = useMemo(() => {
		return offersQuery.data?.offers ?? [];
	}, [offersQuery.data?.offers]);

	useEffect(() => {
		if (!offersQuery.data) {
			return;
		}

		const offerStillExists = offersQuery.data.offers.some((offer) => {
			return offer.id === selectedOfferId;
		});

		if (offerStillExists) {
			return;
		}

		const defaultOffer = offersQuery.data.offers.find((offer) => offer.is_highlighted) ?? offersQuery.data.offers[0];

		setTimeout(() => setSelectedOfferId(defaultOffer?.id ?? null));
	}, [offersQuery.data, selectedOfferId]);

	const selectedOffer = useMemo(() => {
		return marketOffers.find((offer) => offer.id === selectedOfferId) ?? null;
	}, [marketOffers, selectedOfferId]);

	const quoteInput = useMemo(() => {
		if (!selectedOfferId) {
			return null;
		}

		return {
			market: selectedMarketCode,
			offerId: selectedOfferId,
			includeOrderBump,
		};
	}, [selectedMarketCode, selectedOfferId, includeOrderBump]);

	const quoteQuery = useCheckoutQuoteQuery(quoteInput);

	function handleMarketChange(marketCode: IMarketCode) {
		setSelectedMarketCode(marketCode);
		setSelectedOfferId(null);
		setIncludeOrderBump(false);

		track({
			eventType: 'market_changed',
			market: marketCode,
			payload: {
				previousMarket: selectedMarketCode,
				nextMarket: marketCode,
			},
		});
	}

	async function handleGoToCheckout() {
		if (!selectedOfferId || !selectedMarketCode) {
			return;
		}

		track({
			eventType: 'checkout_started',
			market: selectedMarketCode,
			payload: {
				offerId: selectedOfferId,
				includeOrderBump,
				totalAmount: quoteQuery.data?.summary.totalAmount,
				currency: quoteQuery.data?.summary.currency,
			},
		});

		const checkoutStartPath = buildCheckoutStartPath({
			marketCode: selectedMarketCode,
			offerId: selectedOfferId,
			orderBumpId: includeOrderBump && currentOrderBump ? currentOrderBump.id : null,
		});

		console.log('checkoutStartPath: ', checkoutStartPath);

		router.push(checkoutStartPath);
	}

	useEffect(() => {
		if (!offersQuery.data) {
			return;
		}

		track({
			eventType: 'product_viewed',
			market: selectedMarketCode,
			payload: {
				productId: offersQuery.data.product.id,
				productSku: offersQuery.data.product.sku,
			},
		});
	}, [offersQuery.data, selectedMarketCode]);

	useEffect(() => {
		if (marketOffers.length === 0) {
			return;
		}

		const currentOfferStillExists = marketOffers.some((offer) => {
			return offer.id === selectedOfferId;
		});

		if (currentOfferStillExists) {
			return;
		}

		const highlightedOffer = marketOffers.find((offer) => {
			return offer.is_highlighted;
		});

		const nextOfferId = highlightedOffer?.id ?? marketOffers[0].id;

		const timeoutId = setTimeout(() => {
			setSelectedOfferId(nextOfferId);
		}, 0);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [marketOffers, selectedOfferId]);

	if (offersQuery.isLoading) {
		return (
			<section className="bg-[#100813] px-6 py-28 text-white lg:px-10 lg:py-40">
				<div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/4 p-10">
					<p className="text-white/50">Carregando ofertas...</p>
				</div>
			</section>
		);
	}

	if (offersQuery.isError || !currentMarket || !product) {
		return (
			<section className="bg-[#100813] px-6 py-28 text-white lg:px-10 lg:py-40">
				<div className="mx-auto max-w-7xl rounded-[2rem] border border-red-400/20 bg-red-500/10 p-10">
					<p className="text-red-200">Não foi possível carregar as ofertas agora.</p>
				</div>
			</section>
		);
	}

	const summary = quoteQuery.data?.summary;
	const locale = currentMarket.locale;
	const currency = currentMarket.currency;

	return (
		<section id="oferta" className="relative overflow-hidden bg-[#100813] px-6 py-28 text-white lg:px-10 lg:py-40">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(168,85,199,0.22),transparent_34%),radial-gradient(circle_at_10%_80%,rgba(215,181,109,0.14),transparent_30%)]" />

			<div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.25 }}
					transition={{ duration: 0.7 }}
					className="lg:sticky lg:top-28"
				>
					<Badge className="bg-brand-gold hover:bg-brand-gold rounded-full text-[#16091f]">Oferta inicial</Badge>

					<h2 className="mt-6 max-w-xl text-5xl leading-[0.98] font-medium tracking-[-0.055em] text-balance sm:text-6xl">
						Escolha como deseja começar.
					</h2>

					<p className="mt-6 max-w-lg text-lg leading-8 text-white/55">
						Selecione o país, veja o preço correspondente e escolha a melhor opção para a primeira compra.
					</p>

					<div className="relative mt-12 aspect-4/5 max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-white/3">
						<div className="bg-brand-violet/25 absolute inset-[12%] rounded-full blur-[90px]" />

						<Image
							src={product.image_url ?? ''}
							alt={product.name}
							fill
							sizes="(max-width: 1024px) 80vw, 35vw"
							className="object-contain p-10 drop-shadow-[0_40px_45px_rgba(0,0,0,0.45)]"
						/>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 28 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.15 }}
					transition={{ duration: 0.75, delay: 0.1 }}
					className="rounded-[2rem] border border-white/10 bg-white/4 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-7"
				>
					<div>
						<p className="text-sm font-medium text-white/50">País de compra</p>

						{/* Market options */}
						<div className="mt-4 grid grid-cols-2 gap-3">
							{availableMarkets.map((market) => {
								const isSelected = market.code === selectedMarketCode;

								return (
									<button
										key={market.code}
										type="button"
										onClick={() => handleMarketChange(market.code)}
										className={cn(
											'rounded-2xl border px-5 py-4 text-left transition-all',
											isSelected
												? 'border-brand-gold bg-brand-gold text-[#16091f]'
												: 'border-white/10 bg-white/3 text-white/65 hover:border-white/25 hover:text-white'
										)}
									>
										<span className="block text-sm font-medium">{market.label}</span>

										<span className="mt-1 block text-xs opacity-70">{market.currency}</span>
									</button>
								);
							})}
						</div>
					</div>

					<Separator className="my-7 bg-white/10" />

					<div>
						<p className="text-sm font-medium text-white/50">Escolha sua oferta</p>

						<div className="mt-4 grid gap-4">
							{marketOffers.map((offer) => {
								const isSelected = selectedOffer?.id === offer.id;

								return (
									<OfferOption
										key={offer.id}
										offer={offer}
										isSelected={isSelected}
										selectedMarketCode={currentMarket.code}
										currency={currency}
										locale={locale}
										onSetSelectedOfferId={(offerId) => setSelectedOfferId(offerId)}
									/>
								);
							})}
						</div>
					</div>

					{currentOrderBump ? (
						<>
							<Separator className="my-7 bg-white/10" />

							<OrderBumpOption
								currentOrderBump={currentOrderBump}
								includeOrderBump={includeOrderBump}
								currency={currency}
								locale={locale}
								onSetIncludeOrderBump={() => {
									setIncludeOrderBump((current) => {
										const nextValue = !current;

										track({
											eventType: 'order_bump_changed',
											market: selectedMarketCode,
											payload: {
												orderBumpId: currentOrderBump.id,
												orderBumpName: currentOrderBump.name,
												included: nextValue,
											},
										});

										return nextValue;
									});
								}}
							/>
						</>
					) : null}

					<Separator className="my-7 bg-white/10" />

					<div className="rounded-3xl bg-[#09050b]/55 p-5">
						<h3 className="text-lg font-medium">Resumo do pedido</h3>

						{quoteQuery.isLoading || !summary ? (
							<p className="mt-5 text-sm text-white/45">Calculando resumo...</p>
						) : (
							<>
								<div className="mt-5 space-y-3 text-sm">
									<SummaryRow
										label="Subtotal"
										value={formatMoney({
											amount: summary.subtotalAmount,
											currency,
											locale,
										})}
									/>

									<SummaryRow
										label="Desconto"
										value={`- ${formatMoney({
											amount: summary.discountAmount,
											currency,
											locale,
										})}`}
									/>

									<SummaryRow
										label="Frete estimado"
										value={formatMoney({
											amount: summary.shippingAmount,
											currency,
											locale,
										})}
									/>

									<SummaryRow
										label="Imposto estimado"
										value={formatMoney({
											amount: summary.taxAmount,
											currency,
											locale,
										})}
									/>

									<Separator className="my-4 bg-white/10" />

									<div className="flex items-center justify-between gap-4">
										<span className="text-base font-medium">Total</span>

										<span className="text-brand-gold text-3xl font-semibold tracking-[-0.04em]">
											{formatMoney({
												amount: summary.totalAmount,
												currency,
												locale,
											})}
										</span>
									</div>
								</div>

								<Button
									size="lg"
									disabled={!selectedOfferId || quoteQuery.isFetching || addCartItemMutation.isPending}
									className="mt-7 w-full rounded-full bg-[#f5efe4] text-[#16091f] hover:bg-white"
									onClick={handleGoToCheckout}
								>
									{addCartItemMutation.isPending ? 'Salvando carrinho...' : 'Continuar para checkout'}
								</Button>
							</>
						)}

						<p className="mt-4 text-center text-xs leading-5 text-white/35">
							Valores provisórios para demonstração. A confirmação final ocorrerá no checkout.
						</p>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
