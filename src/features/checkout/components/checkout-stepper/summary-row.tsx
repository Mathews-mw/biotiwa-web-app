type SummaryRowProps = {
	label: string;
	value: string;
};

export function SummaryRow({ label, value }: SummaryRowProps) {
	return (
		<div className="flex items-center justify-between gap-4 text-white/55">
			<span>{label}</span>
			<span className="font-medium text-white/85">{value}</span>
		</div>
	);
}
