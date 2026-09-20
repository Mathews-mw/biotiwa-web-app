'use client';

import Link from 'next/link';

import { formatMoney } from '@/features/commerce/lib/format-money';

import { Button } from '@/components/ui/button';

import { CheckCircle2, Clock, XCircle } from 'lucide-react';

interface CheckoutResultStateProps {
	variant: 'success' | 'pending' | 'error';
	title: string;
	description: string;
	orderId?: string;
	amount?: number;
	currency?: 'BRL' | 'USD';
	actionLabel?: string;
	actionHref?: string;
	showOrderDetailsButton?: boolean;
}

export function CheckoutResultState({
	variant,
	title,
	description,
	orderId,
	amount,
	currency,
	actionLabel,
	actionHref,
	showOrderDetailsButton = false,
}: CheckoutResultStateProps) {
	const icon =
		variant === 'success' ? (
			<CheckCircle2 className="size-12 text-emerald-300" />
		) : variant === 'pending' ? (
			<Clock className="text-brand-gold size-12" />
		) : (
			<XCircle className="size-12 text-red-300" />
		);

	return (
		<main className="flex min-h-svh items-center justify-center bg-[#0d0710] px-6 py-16 text-white">
			<section className="mx-auto max-w-xl space-y-4 text-center">
				<div className="mx-auto flex size-20 items-center justify-center rounded-full border border-white/10 bg-white/4">
					{icon}
				</div>

				<p className="text-brand-gold text-xs font-medium tracking-[0.3em] uppercase">Checkout</p>

				<h1 className="text-4xl leading-none font-medium tracking-tighter text-balance sm:text-5xl">{title}</h1>

				<p className="text-base leading-7 text-white/55">{description}</p>

				{orderId ? (
					<div className="rounded-3xl border border-white/10 bg-white/4 p-5 text-left">
						<div className="flex justify-between gap-4 text-sm">
							<span className="text-white/45">Pedido</span>
							<span className="text-right text-white">{orderId}</span>
						</div>

						{amount && currency ? (
							<div className="mt-3 flex justify-between gap-4 text-sm">
								<span className="text-white/45">Total</span>
								<span className="text-white">{formatMoney({ amount, currency, locale: 'pt-BR' })}</span>
							</div>
						) : null}
					</div>
				) : null}

				{actionLabel && actionHref ? (
					<div className="flex justify-center gap-4">
						<Button asChild variant="secondary">
							<Link href={actionHref}>{actionLabel}</Link>
						</Button>

						{showOrderDetailsButton && orderId && (
							<Button asChild variant="ghost">
								<Link href={`/account/orders/${orderId}/details`}>Ver pedido</Link>
							</Button>
						)}
					</div>
				) : null}
			</section>
		</main>
	);
}
