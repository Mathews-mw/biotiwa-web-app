'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';

import { getSafeNextPath } from '../lib/get-safe-next-path';
import { useRegisterMutation, useSessionQuery } from '../hooks/use-auth-queries';

import { type IRegisterFormData, registerSchema } from '../schemas/register-schema';

import { Field } from '@/components/field';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { UserRoundPlus } from 'lucide-react';

export function RegisterForm() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const nextPath = getSafeNextPath(searchParams.get('next'));

	const sessionQuery = useSessionQuery();
	const registerMutation = useRegisterMutation();

	const form = useForm<IRegisterFormData>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
			acceptPrivacy: false,
		},
	});

	useEffect(() => {
		if (sessionQuery.data?.session) {
			router.replace(nextPath);
		}
	}, [sessionQuery.data?.session, nextPath, router]);

	async function handleSubmit(data: IRegisterFormData) {
		await registerMutation.mutateAsync({
			name: data.name,
			email: data.email,
			password: data.password,
		});

		router.push(nextPath);
	}

	const loginHref = `/login?next=${encodeURIComponent(nextPath)}`;

	return (
		<Card className="border-white/10 bg-white/4 p-6 text-white shadow-2xl shadow-black/25 sm:p-8">
			<div className="bg-brand-gold/15 text-brand-gold flex size-12 items-center justify-center rounded-full">
				<UserRoundPlus className="size-6" />
			</div>

			<h2 className="mt-6 text-2xl font-medium">Criar cadastro</h2>

			<p className="mt-2 text-sm leading-6 text-white/45">Crie sua conta para continuar a compra com segurança.</p>

			<form onSubmit={form.handleSubmit(handleSubmit)} className="mt-8 space-y-5">
				<Field label="Nome completo" error={form.formState.errors.name?.message}>
					<Input
						placeholder="Seu nome"
						className="border-white/10 bg-white/5 text-white placeholder:text-white/25"
						{...form.register('name')}
					/>
				</Field>

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
						placeholder="Mínimo de 8 caracteres"
						className="border-white/10 bg-white/5 text-white placeholder:text-white/25"
						{...form.register('password')}
					/>
				</Field>

				<Field label="Confirmar senha" error={form.formState.errors.confirmPassword?.message}>
					<Input
						type="password"
						placeholder="Digite a senha novamente"
						className="border-white/10 bg-white/5 text-white placeholder:text-white/25"
						{...form.register('confirmPassword')}
					/>
				</Field>

				<div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/3 p-4">
					<Checkbox
						id="acceptPrivacy"
						checked={form.watch('acceptPrivacy')}
						onCheckedChange={(checked) => {
							form.setValue('acceptPrivacy', checked === true, {
								shouldValidate: true,
							});
						}}
						className="data-[state=checked]:border-brand-gold data-[state=checked]:bg-brand-gold mt-1 border-white/30"
					/>

					<div>
						<Label htmlFor="acceptPrivacy" className="cursor-pointer text-sm leading-6 text-white/65">
							Li e aceito os Termos de Uso e a Política de Privacidade.
						</Label>

						{form.formState.errors.acceptPrivacy?.message ? (
							<p className="mt-2 text-sm text-red-300">{form.formState.errors.acceptPrivacy.message}</p>
						) : null}
					</div>
				</div>

				{registerMutation.isError ? (
					<p className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
						{registerMutation.error instanceof Error
							? registerMutation.error.message
							: 'Não foi possível criar sua conta. Tente novamente.'}
					</p>
				) : null}

				<Button
					type="submit"
					size="lg"
					disabled={registerMutation.isPending}
					className="w-full rounded-full bg-[#f5efe4] text-[#16091f] hover:bg-white"
				>
					{registerMutation.isPending ? 'Criando cadastro...' : 'Criar conta'}
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
