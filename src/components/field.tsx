import { Label } from './ui/label';

type FieldProps = {
	label: string;
	error?: string;
	children: React.ReactNode;
	className?: string;
};

export function Field({ label, error, children, className }: FieldProps) {
	return (
		<div className={className}>
			<Label className="text-sm text-white/65">{label}</Label>

			<div className="mt-2">{children}</div>

			{error ? <p className="mt-2 text-sm text-red-300">{error}</p> : null}
		</div>
	);
}
