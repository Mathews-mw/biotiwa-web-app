'use client';

import Link from 'next/link';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';

import { type IRegisterFormData, registerSchema } from '../schemas/register-schema';

import { getSafeNextPath } from '../lib/get-safe-next-path';
import { useSessionQuery } from '../hooks/use-auth-queries';
import { registerUserAction } from '../actions/register-user.actions';

import { Field } from '@/components/field';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { Loader2, UserRoundPlus } from 'lucide-react';

export function RegisterForm() {
	const { handleSubmit, formState, register, setValue, watch } = useForm<IRegisterFormData>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
			acceptPrivacy: false,
		},
	});

	const router = useRouter();
	const searchParams = useSearchParams();
	const sessionQuery = useSessionQuery();

	const nextPath = getSafeNextPath(searchParams.get('next'));

	const {
		mutateAsync: registerUserActionFn,
		error,
		isError,
		isPending,
	} = useMutation({
		mutationFn: registerUserAction,
		onError: (err) => {
			toast.error(err.message);
		},
	});

	async function handleRegisterUser(data: IRegisterFormData) {
		const result = await registerUserActionFn(data);

		if (!result.success) {
			toast.error(result.message);
			return;
		}

		toast.success('Cadastro realizado com sucesso');
		router.replace(nextPath);
		router.refresh();
	}

	const loginHref = `/login?next=${encodeURIComponent(nextPath)}`;

	useEffect(() => {
		if (sessionQuery.data?.session) {
			router.replace(nextPath);
		}
	}, [sessionQuery.data?.session, nextPath, router]);

	return (
		<Card className="border-white/10 bg-white/4 p-6 text-white shadow-2xl shadow-black/25 sm:p-8">
			<div className="bg-brand-gold/15 text-brand-gold flex size-12 items-center justify-center rounded-full">
				<UserRoundPlus className="size-6" />
			</div>

			<h2 className="mt-6 text-2xl font-medium">Criar cadastro</h2>

			<p className="mt-2 text-sm leading-6 text-white/45">Crie sua conta para continuar a compra com segurança.</p>

			<form onSubmit={handleSubmit(handleRegisterUser)} className="mt-8 space-y-5">
				<Field label="Nome completo" error={formState.errors.name?.message}>
					<Input
						placeholder="Seu nome"
						className="border-white/10 bg-white/5 text-white placeholder:text-white/25"
						{...register('name')}
					/>
				</Field>

				<Field label="E-mail" error={formState.errors.email?.message}>
					<Input
						type="email"
						placeholder="voce@email.com"
						className="border-white/10 bg-white/5 text-white placeholder:text-white/25"
						{...register('email')}
					/>
				</Field>

				<Field label="Senha" error={formState.errors.password?.message}>
					<Input
						type="password"
						placeholder="Mínimo de 8 caracteres"
						className="border-white/10 bg-white/5 text-white placeholder:text-white/25"
						{...register('password')}
					/>
				</Field>

				<Field label="Confirmar senha" error={formState.errors.confirmPassword?.message}>
					<Input
						type="password"
						placeholder="Digite a senha novamente"
						className="border-white/10 bg-white/5 text-white placeholder:text-white/25"
						{...register('confirmPassword')}
					/>
				</Field>

				<div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/3 p-4">
					<Checkbox
						id="acceptPrivacy"
						checked={watch('acceptPrivacy')}
						onCheckedChange={(checked) => {
							setValue('acceptPrivacy', checked === true, {
								shouldValidate: true,
							});
						}}
						className="data-[state=checked]:border-brand-gold data-[state=checked]:bg-brand-gold mt-1 border-white/30"
					/>

					<div>
						<Label htmlFor="acceptPrivacy" className="cursor-pointer text-sm leading-6 text-white/65">
							Li e aceito os Termos de Uso e a Política de Privacidade.
						</Label>

						{formState.errors.acceptPrivacy?.message ? (
							<p className="mt-2 text-sm text-red-300">{formState.errors.acceptPrivacy.message}</p>
						) : null}
					</div>
				</div>

				{isError ? (
					<p className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
						{error instanceof Error ? error.message : 'Não foi possível criar sua conta. Tente novamente.'}
					</p>
				) : null}

				<Button
					type="submit"
					size="lg"
					disabled={isPending}
					className="w-full rounded-full bg-[#f5efe4] text-[#16091f] hover:bg-white"
				>
					{isPending && <Loader2 className="animate-spin" />}
					{isPending ? 'Criando cadastro...' : 'Criar conta'}
				</Button>
			</form>

			<p className="mt-6 text-center text-sm text-white/45">
				Já tem conta?{' '}
				<Link href={loginHref} className="text-brand-gold font-medium">
					Entrar
				</Link>
			</p>
		</Card>
	);
}
