'use server';

import errorCatalog from '@/core/constants/error-catalog';
import { getCookieHeader } from '@/lib/http/get-cookie-header';
import { ApiExceptionsError } from '@/lib/http/api-exceptions-error';
import { deleteAddressRequest } from '../http-request/delete-address.request';

export async function deleteAddressAction(addressId: string) {
	try {
		const serverCookies = await getCookieHeader();

		await deleteAddressRequest(
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
			message: 'Endereço excluído com sucesso',
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
