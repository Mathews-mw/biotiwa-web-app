'use server';

import z from 'zod';

import errorCatalog from '@/core/constants/error-catalog';
import { getCookieHeader } from '@/lib/http/get-cookie-header';
import { ApiExceptionsError } from '@/lib/http/api-exceptions-error';
import { updateCustomerProfileRequest } from '../http-request/update-customer-profile.request';
import {
	type IUpdateCustomerProfileFormInput,
	updateCustomerProfileSchema,
} from './form-schemas/update-customer-profile-schema';

export async function updateCustomerProfileAction({
	profileId,
	data,
}: {
	profileId: string;
	data: IUpdateCustomerProfileFormInput;
}) {
	const parseDataResult = updateCustomerProfileSchema.safeParse(data);

	if (!parseDataResult.success) {
		const { fieldErrors } = z.flattenError(parseDataResult.error);

		return {
			success: false,
			message: 'Erro validação de dados',
			errors: fieldErrors,
		};
	}

	const { preferredMarket, phone, birthDate, document } = parseDataResult.data;

	try {
		const serverCookies = await getCookieHeader();

		await updateCustomerProfileRequest(
			{
				profileId,
				birthDate,
				document,
				phone,
				preferredMarket,
			},
			{
				headers: {
					cookie: serverCookies,
				},
			}
		);

		return {
			success: true,
			message: 'Perfil atualizado com sucesso',
			errors: null,
		};
	} catch (error) {
		console.log('update customer profile action error: ', error);
		if (error instanceof ApiExceptionsError) {
			let errorMsg = '';

			switch (error.code) {
				case errorCatalog[404].RESOURCE_NOT_FOUND_ERROR:
					errorMsg = 'Perfil não encontrado';
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
