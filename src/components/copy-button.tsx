'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { Check, Copy } from 'lucide-react';

interface IProps {
	value: string;
	label: string;
	copiedLabel?: string;
	disabled?: boolean;
}

export function CopyButton({ value, label, copiedLabel = 'Copiado', disabled }: IProps) {
	const [copied, setCopied] = useState(false);

	async function handleCopy() {
		if (disabled) {
			return;
		}

		await navigator.clipboard.writeText(value);

		setCopied(true);

		window.setTimeout(() => {
			setCopied(false);
		}, 2000);
	}

	return (
		<Button type="button" variant="outline" disabled={disabled} onClick={handleCopy}>
			{copied ? <Check /> : <Copy />}

			{copied ? copiedLabel : label}
		</Button>
	);
}
