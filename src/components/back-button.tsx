'use client';

import { useRouter } from 'next/navigation';

import { Button } from './ui/button';

import { ArrowLeft } from 'lucide-react';

export function BackButton() {
	const router = useRouter();

	return (
		<Button variant="link" onClick={() => router.back()} className="text-brand-acai hover:text-brand-violet">
			<ArrowLeft />
			Voltar
		</Button>
	);
}
