import { Button } from '@/components/ui/button';

import { Loader2 } from 'lucide-react';

type CheckoutStepActionsProps = {
	currentStepIndex: number;
	totalSteps: number;
	isSubmitting: boolean;
	onPrevious: () => void;
	onNext: () => Promise<void>;
};

export function CheckoutStepActions({
	currentStepIndex,
	totalSteps,
	isSubmitting,
	onPrevious,
	onNext,
}: CheckoutStepActionsProps) {
	const isFirstStep = currentStepIndex === 0;
	const isLastStep = currentStepIndex === totalSteps - 1;

	return (
		<div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
			<Button
				type="button"
				variant="outline"
				onClick={onPrevious}
				disabled={isFirstStep || isSubmitting}
				className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
			>
				Voltar
			</Button>

			{isLastStep ? (
				<Button
					type="submit"
					size="lg"
					disabled={isSubmitting}
					className="rounded-full bg-[#f5efe4] text-[#16091f] hover:bg-white"
				>
					{isSubmitting && <Loader2 className="animate-spin" />}
					{isSubmitting ? 'Redirecionando...' : 'Ir para pagamento'}
				</Button>
			) : (
				<Button
					type="button"
					size="lg"
					onClick={onNext}
					disabled={isSubmitting}
					className="rounded-full bg-[#f5efe4] text-[#16091f] hover:bg-white"
				>
					Continuar
				</Button>
			)}
		</div>
	);
}
