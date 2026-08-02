'use server';

import z from 'zod';

import { ApiExceptionsError } from '@/lib/http/api-exceptions-error';
import { registerAddressRequest } from '../http-request/register-address.request';
import { type IRegisterAddressFormInput, registerAddressFormSchema } from './form-schemas/register-address-schema';
import { getCookieHeader } from '@/lib/http/get-cookie-header';

export async function registerAddressAction(data: IRegisterAddressFormInput) {
	const parseDataResult = registerAddressFormSchema.safeParse(data);

	if (!parseDataResult.success) {
		const { fieldErrors } = z.flattenError(parseDataResult.error);

		return {
			success: false,
			message: 'Erro validação de dados',
			errors: fieldErrors,
		};
	}

	const {
		market,
		label,
		recipient,
		postalCode,
		addressLine1,
		number,
		addressLine2,
		district,
		city,
		state,
		country,
		isDefault,
	} = parseDataResult.data;

	try {
		const serverCookies = await getCookieHeader();

		await registerAddressRequest(
			{
				market,
				label,
				recipient,
				postalCode,
				addressLine1,
				number,
				addressLine2,
				district,
				city,
				state,
				country,
				isDefault,
			},
			{
				headers: {
					cookie: serverCookies,
				},
			}
		);

		return {
			success: true,
			message: 'Endereço cadastrado com sucesso',
			errors: null,
		};
	} catch (error) {
		console.log('register address action error: ', error);
		if (error instanceof ApiExceptionsError) {
			return {
				success: false,
				message: error.message,
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
