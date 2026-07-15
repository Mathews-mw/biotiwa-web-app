type ReviewBlockProps = {
	title: string;
	items: readonly (readonly [string, string])[];
};

export function ReviewBlock({ title, items }: ReviewBlockProps) {
	return (
		<div className="rounded-2xl border border-white/10 bg-black/15 p-4">
			<p className="text-brand-gold text-sm font-medium">{title}</p>

			<div className="mt-4 space-y-3">
				{items.map(([label, value]) => (
					<div key={label}>
						<p className="text-xs text-white/35">{label}</p>
						<p className="mt-1 text-sm wrap-break-word text-white/80">{value}</p>
					</div>
				))}
			</div>
		</div>
	);
}
