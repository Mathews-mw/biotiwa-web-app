'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';

import { getSafeNextPath } from '../lib/get-safe-next-path';
import { useLoginMutation, useSessionQuery } from '../hooks/use-auth-queries';

import { type ILoginFormData, loginSchema } from '../schemas/login-schema';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { LockKeyhole } from 'lucide-react';

export function LoginForm() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const nextPath = getSafeNextPath(searchParams.get('next'));

	const sessionQuery = useSessionQuery();
	const loginMutation = useLoginMutation();

	const form = useForm<ILoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	useEffect(() => {
		if (sessionQuery.data?.session) {
			router.replace(nextPath);
		}
	}, [sessionQuery.data?.session, nextPath, router]);

	async function handleSubmit(data: ILoginFormData) {
		await loginMutation.mutateAsync(data);

		router.push(nextPath);
	}

	const registerHref = `/register?next=${encodeURIComponent(nextPath)}`;

	return (
		<Card className="border-white/10 bg-white/4 p-6 text-white shadow-2xl shadow-black/25 sm:p-8">
			<div className="bg-brand-gold/15 text-brand-gold flex size-12 items-center justify-center rounded-full">
				<LockKeyhole className="size-6" />
			</div>

			<h2 className="mt-6 text-2xl font-medium">Entrar na sua conta</h2>

			<p className="mt-2 text-sm leading-6 text-white/45">
				Acesse sua conta para continuar a compra e manter seu carrinho salvo.
			</p>

			<form onSubmit={form.handleSubmit(handleSubmit)} className="mt-8 space-y-5">
				<Field label="E-mail" error={form.formState.errors.email?.message}>
					<Input
						type="email"
						placeholder="voce@email.com"
						className="border-white/10 bg-white/5 text-white placeholder:text-white/25"
						{...form.register('email')}
					/>
				</Field>

				<Field label="Senha" error={form.formState.errors.password?.message}>
					<Input
						type="password"
						placeholder="Sua senha"
						className="border-white/10 bg-white/5 text-white placeholder:text-white/25"
						{...form.register('password')}
					/>
				</Field>

				{loginMutation.isError ? (
					<p className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
						{loginMutation.error instanceof Error
							? loginMutation.error.message
							: 'Não foi possível entrar. Tente novamente.'}
					</p>
				) : null}

				<Button
					type="submit"
					size="lg"
					disabled={loginMutation.isPending}
					className="w-full rounded-full bg-[#f5efe4] text-[#16091f] hover:bg-white"
				>
					{loginMutation.isPending ? 'Entrando...' : 'Entrar'}
				</Button>
			</form>

			<p className="mt-6 text-center text-sm text-white/45">
				Ainda não tem conta?{' '}
				<Link href={registerHref} className="text-brand-gold font-medium">
					Criar cadastro
				</Link>
			</p>
		</Card>
	);
}

type FieldProps = {
	label: string;
	error?: string;
	children: React.ReactNode;
};

function Field({ label, error, children }: FieldProps) {
	return (
		<div>
			<Label className="text-sm text-white/65">{label}</Label>

			<div className="mt-2">{children}</div>

			{error ? <p className="mt-2 text-sm text-red-300">{error}</p> : null}
		</div>
	);
}
