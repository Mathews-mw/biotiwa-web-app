'use server';

import z from 'zod';

import errorCatalog from '@/core/constants/error-catalog';
import { ApiExceptionsError } from '@/lib/http/api-exceptions-error';
import { registerUserRequest } from '../http-request/register-user.request';
import { type IRegisterUserFormData, registerUserFormSchema } from './form-schemas/register-user-schema';

export async function registerUserAction(data: IRegisterUserFormData) {
	const parseDataResult = registerUserFormSchema.safeParse(data);

	if (!parseDataResult.success) {
		const { fieldErrors } = z.flattenError(parseDataResult.error);

		return {
			success: false,
			message: 'Erro validação de dados',
			errors: fieldErrors,
		};
	}

	const { name, password, email } = parseDataResult.data;

	try {
		await registerUserRequest({
			name,
			email,
			password,
			userConsents: [
				{
					type: 'TERMS_OF_USE',
					version: '2026-07',
				},
				{
					type: 'PRIVACY_POLICY',
					version: '2026-07',
				},
			],
		});

		return {
			success: true,
			message: 'Usuário registrado com sucesso',
			errors: null,
		};
	} catch (error) {
		if (error instanceof ApiExceptionsError) {
			let errorMsg = '';

			switch (error.code) {
				case errorCatalog[400].SAME_EMAIL_ERROR:
					errorMsg = 'E-mail informado já cadastrado';
					break;
				case errorCatalog[400].TERMS_NOT_ACCEPTED:
					errorMsg = 'Você precisa aceitar os termos e a política de privacidade';
					break;
				case errorCatalog[400].PRIVACY_POLICY_NOT_ACCEPTED:
					errorMsg = 'Você precisa aceitar os termos e a política de privacidade';
					break;
				default:
					errorMsg = error.message;
			}

			return {
				success: false,
				message: errorMsg,
				errors: null,
			};
		}

		return {
			success: false,
			message: 'Erro inesperado. Por favor, tente novamente mais tarde',
			errors: null,
		};
	}
}
