'use server';

import errorCatalog from '@/core/constants/error-catalog';
import { getCookieHeader } from '@/lib/http/get-cookie-header';
import { ApiExceptionsError } from '@/lib/http/api-exceptions-error';
import { getCurrentSessionRequest } from '@/features/auth/http-request/get-current-session.request';

export async function getUserProfileAction() {
	try {
		const serverCookies = await getCookieHeader();

		const result = await getCurrentSessionRequest({
			headers: {
				cookie: serverCookies,
			},
		});

		return {
			success: true,
			data: result,
			message: 'Usuário registrado com sucesso',
			errors: null,
		};
	} catch (error) {
		if (error instanceof ApiExceptionsError) {
			let errorMsg = '';

			switch (error.code) {
				case errorCatalog[404].RESOURCE_NOT_FOUND_ERROR:
					errorMsg = 'Usuário não encontrado';
					break;
				default:
					errorMsg = error.message;
			}

			return {
				success: false,
				data: null,
				message: errorMsg,
				errors: null,
			};
		}

		return {
			success: false,
			data: null,
			message: 'Erro inesperado. Por favor, tente novamente mais tarde',
			errors: null,
		};
	}
}
