'use client';

import { toast } from 'sonner';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { ICustomerProfile, IUser } from '../../types/user.types';

import { cpfFormatter } from '@/utils/cpf-formatter';
import { phoneFormatter } from '@/utils/phone-formatter';
import { updateCustomerProfileAction } from '../../actions/update-customer-profile.actions';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CpfInput } from '@/components/cpf-input';
import { DateInput } from '@/components/date-input';
import { Checkbox } from '@/components/ui/checkbox';
import { PhoneInput } from '@/components/phone-input';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import {
	IUpdateCustomerProfileFormInput,
	updateCustomerProfileSchema,
} from '../../actions/form-schemas/update-customer-profile-schema';

import { Loader2 } from 'lucide-react';
import { birthdayFormatter } from '@/utils/birthday-formatter';
import { useSessionQuery } from '@/features/auth/hooks/use-auth-queries';

interface IProps {
	user: IUser;
	profile: ICustomerProfile;
}

export function UserProfileForm({ user, profile }: IProps) {
	const {
		control,
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<IUpdateCustomerProfileFormInput>({
		resolver: zodResolver(updateCustomerProfileSchema),
		defaultValues: {
			name: user.name ?? undefined,
			birthDate: profile.birth_date ? birthdayFormatter(profile.birth_date) : undefined,
			document: profile.document ? cpfFormatter(profile.document) : undefined,
			phone: profile.phone ? phoneFormatter(profile.phone) : undefined,
			preferredMarket: profile.preferred_market ?? undefined,
		},
	});

	const sessionQuery = useSessionQuery();

	const { mutateAsync: updateCustomerProfileActionFn, isPending } = useMutation({
		mutationFn: updateCustomerProfileAction,
		onSuccess: async () => {
			await sessionQuery.refetch();
		},
	});

	async function handleUpdateProfile(data: IUpdateCustomerProfileFormInput) {
		const result = await updateCustomerProfileActionFn({ profileId: profile.id, data });

		if (!result.success) {
			toast.error(result.message);
			return;
		}

		toast.success(result.message);
	}

	return (
		<form id="update-profile-form" onSubmit={handleSubmit(handleUpdateProfile)} className="flex flex-col gap-4">
			<FieldGroup>
				<Field aria-invalid={!!errors.name} className="space-y-2">
					<FieldLabel htmlFor="name">Nome completo *</FieldLabel>
					<Input id="name" aria-invalid={!!errors.name} {...register('name')} />
					<FieldError errors={[errors.name]} />
				</Field>

				<Field className="space-y-2">
					<FieldLabel>E-mail</FieldLabel>
					<Input value={user.email} disabled readOnly />
				</Field>

				<Controller
					name="document"
					control={control}
					render={({ field, fieldState }) => {
						return (
							<Field data-invalid={fieldState.invalid} className="space-y-2">
								<FieldLabel htmlFor="document">CPF*</FieldLabel>
								<CpfInput
									{...field}
									id="document"
									aria-invalid={fieldState.invalid}
									value={field.value}
									onChange={field.onChange}
								/>
								<FieldError errors={[fieldState.error]} />
							</Field>
						);
					}}
				/>

				<Controller
					name="birthDate"
					control={control}
					render={({ field, fieldState }) => {
						return (
							<Field data-invalid={fieldState.invalid} className="space-y-2">
								<FieldLabel htmlFor="birthday">Data de nascimento*</FieldLabel>
								<DateInput
									{...field}
									id="birthDate"
									aria-invalid={fieldState.invalid}
									value={field.value}
									onChange={field.onChange}
								/>
								<FieldError errors={[fieldState.error]} />
							</Field>
						);
					}}
				/>

				<Controller
					name="phone"
					control={control}
					render={({ field, fieldState }) => {
						return (
							<Field data-invalid={fieldState.invalid} className="space-y-2">
								<Label htmlFor="phone">Telefone</Label>
								<PhoneInput
									{...field}
									id="phone"
									aria-invalid={fieldState.invalid}
									value={field.value}
									onChange={field.onChange}
								/>
								<FieldError errors={[fieldState.error]} />
							</Field>
						);
					}}
				/>

				<div className="flex items-center gap-2">
					<Controller
						name="advertisingConsent"
						control={control}
						render={({ field }) => {
							return <Checkbox id="terms" className="mt-2" checked={field.value} onCheckedChange={field.onChange} />;
						}}
					/>

					<label
						htmlFor="terms"
						className="mt-2 text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Quero receber ofertas e novidades por e-mail
					</label>
				</div>

				<div className="flex justify-end">
					<Button type="submit" disabled={isPending || isSubmitting}>
						{(isPending || isSubmitting) && <Loader2 className="animate-spin" />}
						Salvar
					</Button>
				</div>
			</FieldGroup>
		</form>
	);
}
