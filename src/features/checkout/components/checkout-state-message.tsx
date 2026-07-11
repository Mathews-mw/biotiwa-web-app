type CheckoutStateMessageProps = {
	title: string;
	description: string;
	actionLabel?: string;
	actionHref?: string;
};

export function CheckoutStateMessage({ title, description, actionLabel, actionHref }: CheckoutStateMessageProps) {
	return (
		<main className="flex min-h-svh items-center justify-center bg-[#0d0710] px-6 py-16 text-white">
			<section className="mx-auto max-w-xl text-center">
				<p className="text-brand-gold text-xs font-medium tracking-[0.3em] uppercase">Checkout</p>

				<h1 className="mt-5 text-4xl leading-none font-medium tracking-tighter text-balance">{title}</h1>

				<p className="mt-5 text-base leading-7 text-white/55">{description}</p>

				{actionLabel && actionHref ? (
					<a
						href={actionHref}
						className="mt-8 inline-flex rounded-full bg-[#f5efe4] px-6 py-3 text-sm font-medium text-[#16091f] transition-colors hover:bg-white"
					>
						{actionLabel}
					</a>
				) : null}
			</section>
		</main>
	);
}
