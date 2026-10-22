import { useEffect, useState } from 'react';

import { useWatch, type UseFormReturn } from 'react-hook-form';
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
	const appliedCode = useWatch({
		control: form.control,
		name: 'promotionCode',
	});

	const [draftCode, setDraftCode] = useState('');

	const hasAppliedPromotion = Boolean(appliedPromotion && appliedCode);

	const displayedCode = appliedCode || draftCode;

	async function handleApply() {
		const normalizedCode = draftCode.trim().toUpperCase();

		if (!normalizedCode) {
			return;
		}

		await onApply(normalizedCode);
		setDraftCode(normalizedCode);
	}

	function handleRemove() {
		setDraftCode('');
		onRemove();
	}

	return (
		<div className="space-y-4 rounded-[2rem] border border-white/10 bg-white/4 p-6 text-white">
			<div className="flex w-full items-center justify-between">
				<p className="text-brand-gold text-sm font-medium">Tem um cupom?</p>
				<span className="text-muted-foreground text-xs">Opcional</span>
			</div>

			<div className="flex gap-2">
				<Input
					value={displayedCode}
					onChange={(event) => setDraftCode(event.target.value)}
					placeholder="Cupom ou código de afiliado"
					autoComplete="off"
					disabled={hasAppliedPromotion}
				/>

				{hasAppliedPromotion ? (
					<Button type="button" variant="ghost" onClick={handleRemove}>
						Remover
					</Button>
				) : (
					<Button type="button" variant="ghost" disabled={isApplying || !draftCode.trim()} onClick={handleApply}>
						{isApplying ? 'Aplicando...' : 'Aplicar'}
					</Button>
				)}
			</div>

			{errorMessage && <p className="text-destructive text-sm">{errorMessage}</p>}
		</div>
	);
}
