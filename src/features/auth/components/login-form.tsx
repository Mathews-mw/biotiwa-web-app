'use client';

import Link from 'next/link';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { ISignInFormData } from '../actions/form-schemas/signin.schema';

import { authQueryKeys } from '../api/auth-query-keys';
import errorCatalog from '@/core/constants/error-catalog';
import { getSafeNextPath } from '../lib/get-safe-next-path';
import { useSessionQuery } from '../hooks/use-auth-queries';
import { ApiExceptionsError } from '@/lib/http/api-exceptions-error';
import { type ILoginFormData, loginSchema } from '../schemas/login-schema';
import { signInCredentialsRequest } from '../http-request/signin-credentials.request';

import { Field } from '@/components/field';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { Loader2, LockKeyhole } from 'lucide-react';

export function LoginForm() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const searchParams = useSearchParams();

	const nextPath = getSafeNextPath(searchParams.get('next'));

	const sessionQuery = useSessionQuery();

	const emailParams = searchParams.get('email') ?? '';

	const form = useForm<ILoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: emailParams,
			password: '',
		},
	});

	const {
		mutateAsync: signInCredentialsRequestFn,
		isPending,
		isError,
		error,
	} = useMutation({
		mutationFn: signInCredentialsRequest,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: authQueryKeys.session(),
			});
		},
	});

	async function handleSignInCredentials(data: ISignInFormData) {
		try {
			await signInCredentialsRequestFn(data);

			router.replace(nextPath);
			router.refresh();
		} catch (error) {
			if (error instanceof ApiExceptionsError) {
				let errorMsg = '';

				switch (error.code) {
					case errorCatalog[401].AUTH_INVALID_CREDENTIALS_ERROR:
						errorMsg = 'Credenciais inválidas';
						break;

					default:
						errorMsg = error.message;
				}

				toast.error(errorMsg);
				return;
			}

			toast.error('Erro inesperado. Por favor, tente novamente mais tarde');
		}
	}

	const registerHref = `/register?next=${encodeURIComponent(nextPath)}`;

	useEffect(() => {
		if (sessionQuery.data?.session) {
			router.replace(nextPath);
		}
	}, [sessionQuery.data?.session, nextPath, router]);

	return (
		<Card className="border-white/10 bg-white/4 p-6 text-white shadow-2xl shadow-black/25 sm:p-8">
			<div className="bg-brand-gold/15 text-brand-gold flex size-12 items-center justify-center rounded-full">
				<LockKeyhole className="size-6" />
			</div>

			<h2 className="mt-6 text-2xl font-medium">Entrar na sua conta</h2>

			<p className="mt-2 text-sm leading-6 text-white/45">
				Acesse sua conta para continuar a compra e manter seu carrinho salvo.
			</p>

			<form onSubmit={form.handleSubmit(handleSignInCredentials)} className="mt-8 space-y-5">
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

				{isError ? (
					<p className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
						{error instanceof Error ? error.message : 'Não foi possível entrar. Tente novamente.'}
					</p>
				) : null}

				<Button
					type="submit"
					size="lg"
					disabled={isPending}
					className="w-full rounded-full bg-[#f5efe4] text-[#16091f] hover:bg-white"
				>
					{isPending && <Loader2 className="animate-spin" />}
					{isPending ? 'Entrando...' : 'Entrar'}
				</Button>
			</form>

			<p className="mt-6 text-center text-sm text-white/45">
				Ainda não tem conta?{' '}
				<Link href={registerHref} className="text-brand-gold font-medium">
					Criar conta
				</Link>
			</p>
		</Card>
	);
}
