'use client';

import { Button } from '@/components/ui/button';

import { Save, Trash2 } from 'lucide-react';

type CheckoutDraftStatusProps = {
	hasDraft: boolean;
	lastSavedAt: string | null;
	onClear: () => void;
};

export function CheckoutDraftStatus({ hasDraft, lastSavedAt, onClear }: CheckoutDraftStatusProps) {
	if (!hasDraft && !lastSavedAt) {
		return null;
	}

	const formattedTime = lastSavedAt
		? new Intl.DateTimeFormat('pt-BR', {
			timeStyle: 'short',
		}).format(new Date(lastSavedAt))
		: null;

	return (
		<div className="mt-4 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
			<div className="flex items-center gap-2">
				<Save className="text-brand-gold size-4" />

				<span>
					Dados salvos automaticamente
					{formattedTime ? ` às ${formattedTime}` : ''}.
				</span>
			</div>

			<Button
				type="button"
				variant="ghost"
				size="sm"
				onClick={onClear}
				className="w-fit rounded-full text-white/55 hover:bg-white/10 hover:text-white"
			>
				<Trash2 className="size-4" />
				Limpar rascunho salvo
			</Button>
		</div>
	);
}
