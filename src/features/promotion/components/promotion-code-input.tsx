import { useState } from 'react';

import type { UseFormReturn } from 'react-hook-form';
import type { ICheckoutFormData } from '@/features/checkout/schemas/checkout-schema';
import type { ICheckoutPromotionSummary } from '@/features/checkout/types/checkout.types';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface PromotionCodeInputProps {
	form: UseFormReturn<ICheckoutFormData>;
	appliedPromotion: ICheckoutPromotionSummary | null;
	isApplying: boolean;
	errorMessage?: string;
	onApply: (code: string) => Promise<void>;
	onRemove: () => void;
}

export function PromotionCodeInput({
	form,
	appliedPromotion,
	isApplying,
	errorMessage,
	onApply,
	onRemove,
}: PromotionCodeInputProps) {
	const appliedCode = form.watch('promotionCode');

	const [inputValue, setInputValue] = useState(appliedCode ?? '');

	async function handleApply() {
		const normalizedCode = inputValue.trim().toUpperCase();

		if (!normalizedCode) {
			return;
		}

		console.log('normalizedCode: ', normalizedCode);
		await onApply(normalizedCode);
		setInputValue(normalizedCode);
	}

	function handleRemove() {
		setInputValue('');

		onRemove();
	}

	if (appliedPromotion && appliedCode) {
		return (
			<div className="space-y-4 rounded-[2rem] border border-white/10 bg-white/4 p-6 text-white">
				<p className="text-brand-gold text-sm font-medium">Código de cupom aplicado</p>
				<div className="flex items-center justify-between rounded-md border p-3">
					<div>
						<p className="text-sm font-medium">{appliedPromotion.code}</p>
					</div>

					<Button type="button" variant="ghost" onClick={handleRemove}>
						Remover
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-4 rounded-[2rem] border border-white/10 bg-white/4 p-6 text-white">
			<div className="flex w-full items-center justify-between">
				<p className="text-brand-gold text-sm font-medium">Tem um cupom?</p>
				<span className="text-muted-foreground text-xs">Opcional</span>
			</div>

			<div className="flex gap-2">
				<Input
					value={inputValue}
					onChange={(event) => setInputValue(event.target.value)}
					placeholder="Cupom ou código de afiliado"
					autoComplete="off"
				/>

				<Button type="button" variant="ghost" disabled={isApplying || !inputValue.trim()} onClick={handleApply}>
					{isApplying ? 'Aplicando...' : 'Aplicar'}
				</Button>
			</div>

			{errorMessage && <p className="text-destructive text-sm">{errorMessage}</p>}
		</div>
	);
}
