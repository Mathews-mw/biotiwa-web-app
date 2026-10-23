'use server';

import z from 'zod';

import type { IActionResponse } from '@/core/actions/action-response-type';

import errorCatalog from '@/core/constants/error-catalog';
import { getCookieHeader } from '@/lib/http/get-cookie-header';
import { ApiExceptionsError } from '@/lib/http/api-exceptions-error';
import { registerAffiliateRequest } from '../http-requests/register-affiliate.request';
import {
	type IRegisterAffiliateFormInput,
	registerAffiliateFormSchema,
} from './form-schemas/register-affiliate-schema';

export async function registerAffiliateAction(data: IRegisterAffiliateFormInput): Promise<IActionResponse> {
	const parseDataResult = registerAffiliateFormSchema.safeParse(data);

	if (!parseDataResult.success) {
		const { fieldErrors } = z.flattenError(parseDataResult.error);

		return {
			success: false,
			message: 'Erro validação de dados',
			data: null,
			errorCode: null,
			fieldErrors,
		};
	}

	const { type } = parseDataResult.data;

	try {
		const serverCookies = await getCookieHeader();

		await registerAffiliateRequest(
			{
				type,
			},
			{
				headers: {
					cookie: serverCookies,
				},
			}
		);

		return {
			success: true,
			message: 'Afiliado registrado com sucesso',
			data: null,
			errorCode: null,
			fieldErrors: null,
		};
	} catch (error) {
		if (error instanceof ApiExceptionsError) {
			let errorMsg = '';

			switch (error.code) {
				case errorCatalog[400].AFFILIATE_ALREADY_EXISTS:
					errorMsg = 'Usuário já possui afiliação cadastrada';
				case errorCatalog[404].USER_NOT_FOUND:
					errorMsg = 'Usuário não encontrado';
				default:
					errorMsg = error.message;
			}

			return {
				success: false,
				message: errorMsg,
				data: null,
				errorCode: error.code,
				fieldErrors: null,
			};
		}

		return {
			success: false,
			message: 'Erro inesperado. Por favor, tente novamente mais tarde',
			data: null,
			errorCode: null,
			fieldErrors: null,
		};
	}
}
