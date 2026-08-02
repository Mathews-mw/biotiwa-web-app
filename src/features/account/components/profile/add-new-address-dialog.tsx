'use client';

import { toast } from 'sonner';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { IViaCepResponse } from '../../types/via-cep.types';

import { addressQueryKeys } from '../../query-keys/account-query-keys';
import { registerAddressAction } from '../../actions/register-address.actions';
import {
	type IRegisterAddressFormInput,
	registerAddressFormSchema,
} from '../../actions/form-schemas/register-address-schema';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CepInput } from '@/components/cep-input';
import { ErrorMessage } from '@/components/error-message';
import { Field, FieldDescription, FieldError, FieldGroup } from '@/components/ui/field';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import { Loader2 } from 'lucide-react';
import { IconMapPinPlus } from '@tabler/icons-react';

interface IProps {
	userId: string;
}

export function AddNewAddressDialog({ userId }: IProps) {
	const {
		handleSubmit,
		register,
		setValue,
		reset,
		formState: { isSubmitting, errors },
	} = useForm<IRegisterAddressFormInput>({
		resolver: zodResolver(registerAddressFormSchema),
		defaultValues: {
			market: 'BR',
			country: 'BR',
			postalCode: '',
		},
	});

	const [isOpen, setIsOpen] = useState(false);
	const [isSearchCep, setIsSearchCep] = useState(false);
	const [cepInputValue, setCepInputValue] = useState<string>('');
	const [searchCepErrorMessage, setSearchCepErrorMessage] = useState('');

	const queryClient = useQueryClient();

	const {
		mutateAsync: registerAddressActionFn,
		error,
		isError,
		isPending,
	} = useMutation({
		mutationFn: registerAddressAction,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: addressQueryKeys.userAddresses(userId) });
		},
	});

	async function handleRegisterAddress(data: IRegisterAddressFormInput) {
		console.log('call form action');

		if (!cepInputValue) {
			return setSearchCepErrorMessage('Por favor, preencha o CEP.');
		} else {
			setSearchCepErrorMessage('');
		}

		const result = await registerAddressActionFn({ ...data, postalCode: cepInputValue });

		if (!result.success) {
			toast.error(result.message);
			return;
		}

		toast.success(result.message);
		reset();
		setIsOpen(false);
	}

	async function searchCep() {
		if (!cepInputValue) {
			setIsSearchCep(false);
			return;
		}

		const cepFormatted = cepInputValue.replace('-', '');

		if (cepFormatted.length < 8) {
			return setSearchCepErrorMessage('Informe um CEP válido');
		}

		setIsSearchCep(true);
		const data = await fetch(`https://viacep.com.br/ws/${cepFormatted}/json/`);

		const result = await data.json();

		if (result.erro === 'true') {
			setIsSearchCep(false);
			return setSearchCepErrorMessage('CEP não encontrado');
		} else {
			setSearchCepErrorMessage('');
		}

		const cepResponse = result as IViaCepResponse;

		setValue('addressLine1', cepResponse.logradouro, {
			shouldValidate: true,
			shouldDirty: true,
		});
		setValue('district', cepResponse.bairro, {
			shouldDirty: true,
			shouldValidate: true,
		});
		setValue('city', cepResponse.localidade, {
			shouldDirty: true,
			shouldValidate: true,
		});
		setValue('state', cepResponse.uf, {
			shouldDirty: true,
			shouldValidate: true,
		});

		setIsSearchCep(false);
	}

	return (
		<Dialog modal open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button size="sm" variant="outline">
					<IconMapPinPlus className="text-brand-acai" /> Novo endereço
				</Button>
			</DialogTrigger>

			<DialogContent className="w-full max-w-[95%] rounded-lg lg:w-min lg:min-w-160">
				<DialogHeader>
					<div className="flex items-center gap-2">
						<IconMapPinPlus className="text-brand-acai" />
						<DialogTitle>Cadastrar novo endereço de entrega</DialogTitle>
					</div>

					<DialogDescription className="text-muted-foreground text-justify text-sm">
						Informe um novo endereço para as suas entregas. Lembrando, você pode marcar esse novo endereço como o padrão
						para as suas encomendas.
					</DialogDescription>
				</DialogHeader>

				<form id="register-address-form" onSubmit={handleSubmit(handleRegisterAddress)} className="space-y-4">
					<div className="space-y-2">
						<div className="flex gap-4">
							<CepInput
								value={cepInputValue}
								onValueChange={(value) => {
									setCepInputValue(value);
									setValue('postalCode', value.replace(/\D/g, ''), {
										shouldValidate: true,
										shouldDirty: true,
									});
								}}
								placeholder="CEP*"
								className="max-w-28"
							/>
							<Button
								type="button"
								variant="outline"
								onClick={searchCep}
								disabled={isSearchCep || isSubmitting || isPending}
								className="flex items-center justify-center gap-1.5"
							>
								Buscar
								{isSearchCep && <Loader2 className="h-4 w-4 animate-spin" />}
							</Button>
						</div>

						<ErrorMessage message={searchCepErrorMessage} />
					</div>

					<FieldGroup>
						<div className="grid grid-cols-3 gap-2.5">
							<Field aria-invalid={!!errors.addressLine1} className="col-span-2">
								<Input placeholder="Logradouro*" aria-invalid={!!errors.addressLine1} {...register('addressLine1')} />
								<FieldError errors={[errors.addressLine1]} />
							</Field>

							<Field aria-invalid={!!errors.number}>
								<Input placeholder="Número*" aria-invalid={!!errors.number} {...register('number')} />
								<FieldError errors={[errors.number]} />
							</Field>
						</div>

						<Field aria-invalid={!!errors.district}>
							<Input placeholder="Bairro*" aria-invalid={!!errors.district} {...register('district')} />
							<FieldError errors={[errors.district]} />
						</Field>

						<Field>
							<Input placeholder="Complemento (Opcional)" {...register('addressLine2')} />
							<FieldDescription>Ex.: Apto 123 Bloco 2A</FieldDescription>
							{/* <small className="text-muted-foreground ml-1 text-xs"></small> */}
						</Field>

						<div className="grid grid-cols-2 gap-2.5">
							<Field aria-invalid={!!errors.city}>
								<Input placeholder="Cidade*" aria-invalid={!!errors.city} {...register('city')} />
								<FieldError errors={[errors.city]} />
							</Field>
							<Field aria-invalid={!!errors.state}>
								<Input placeholder="UF*" aria-invalid={!!errors.state} {...register('state')} />
								<FieldError errors={[errors.state]} />
							</Field>
						</div>
					</FieldGroup>

					{isError ? (
						<p className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
							{error instanceof Error ? error.message : 'Não foi possível criar sua conta. Tente novamente.'}
						</p>
					) : null}

					<div className="flex w-full justify-end gap-2">
						<Button type="submit" form="register-address-form" disabled={isSearchCep || isSubmitting || isPending}>
							{(isSubmitting || isPending) && <Loader2 className="animate-spin" />}
							{isPending ? 'Salvando...' : 'Salvar'}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
