import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

export type CheckoutStep = {
	id: 'offer' | 'customer' | 'address' | 'review';
	title: string;
	description: string;
};

type CheckoutStepperProps = {
	steps: CheckoutStep[];
	currentStepIndex: number;
};

export function CheckoutStepper({ steps, currentStepIndex }: CheckoutStepperProps) {
	return (
		<div className="rounded-[2rem] border border-white/10 bg-white/4 p-4 text-white">
			<div className="grid gap-3 sm:grid-cols-4">
				{steps.map((step, index) => {
					const isCurrent = index === currentStepIndex;
					const isCompleted = index < currentStepIndex;

					return (
						<div
							key={step.id}
							className={cn(
								'rounded-2xl border p-4 transition-all',
								isCurrent ? 'border-brand-gold bg-brand-gold/10' : 'border-white/10 bg-white/2.5'
							)}
						>
							<div
								className={cn(
									'flex size-8 items-center justify-center rounded-full text-sm font-semibold',
									isCompleted || isCurrent ? 'bg-brand-gold text-[#16091f]' : 'bg-white/10 text-white/45'
								)}
							>
								{isCompleted ? <Check className="size-4" /> : index + 1}
							</div>

							<p className="mt-3 text-sm font-medium">{step.title}</p>

							<p className="mt-1 hidden text-xs leading-5 text-white/40 sm:block">{step.description}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}
