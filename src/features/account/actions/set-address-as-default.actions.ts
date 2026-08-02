'use server';

import errorCatalog from '@/core/constants/error-catalog';
import { getCookieHeader } from '@/lib/http/get-cookie-header';
import { ApiExceptionsError } from '@/lib/http/api-exceptions-error';
import { setAddressAsDefaultRequest } from '../http-request/set-address-as-default.request';

export async function setAddressAsDefaultAction(addressId: string) {
	try {
		const serverCookies = await getCookieHeader();

		await setAddressAsDefaultRequest(
			{
				addressId,
			},
			{
				headers: {
					cookie: serverCookies,
				},
			}
		);

		return {
			success: true,
			message: 'Endereço atualizado com sucesso',
			errors: null,
		};
	} catch (error) {
		console.log('set address as default error: ', error);
		if (error instanceof ApiExceptionsError) {
			let errorMsg = '';

			switch (error.code) {
				case errorCatalog[404].RESOURCE_NOT_FOUND_ERROR:
					errorMsg = 'Endereço não encontrado';
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
