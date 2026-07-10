interface ISummaryRowProps {
	label: string;
	value: string;
}

export function SummaryRow({ label, value }: ISummaryRowProps) {
	return (
		<div className="flex items-center justify-between gap-4 text-white/60">
			<span>{label}</span>
			<span className="font-medium text-white/80">{value}</span>
		</div>
	);
}
