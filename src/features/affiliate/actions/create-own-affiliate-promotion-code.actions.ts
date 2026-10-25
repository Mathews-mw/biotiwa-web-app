import z from 'zod';

import type { IAffiliatePromotionCode } from '../types/affiliate.types';
import type { IActionResponse } from '@/core/actions/action-response-type';

import errorCatalog from '@/core/constants/error-catalog';
import { ApiExceptionsError } from '@/lib/http/api-exceptions-error';
import { createOwnAffiliatePromotionCodeRequest } from '../http-requests/create-own-affiliate-promotion-code.request';
import {
	createOwnAffiliatePromotionCodeFormSchema,
	type ICreateOwnAffiliatePromotionCodeFormInput,
} from './form-schemas/create-own-affiliate-promotion-code-schema';

export async function createOwnAffiliatePromotionCodeAction(
	data: ICreateOwnAffiliatePromotionCodeFormInput
): Promise<IActionResponse<IAffiliatePromotionCode>> {
	const parseDataResult = createOwnAffiliatePromotionCodeFormSchema.safeParse(data);

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

	const { code, marketCode, expiresInDays, maxUsesPerCustomer } = parseDataResult.data;

	try {
		const result = await createOwnAffiliatePromotionCodeRequest({
			code,
			marketCode,
			expiresInDays,
			maxUsesPerCustomer,
		});

		return {
			success: true,
			message: 'Código promocional criado com sucesso',
			data: result.affiliate_promotion_code,
			errorCode: null,
			fieldErrors: null,
		};
	} catch (error) {
		if (error instanceof ApiExceptionsError) {
			let errorMsg = '';

			switch (error.code) {
				case errorCatalog[400].AFFILIATE_NOT_ACTIVE:
					errorMsg = 'Afiliado não está ativo';
				case errorCatalog[400].AFFILIATE_PROGRAM_NOT_ACTIVE:
					errorMsg = 'O programa de afiliação não está ativo';
				case errorCatalog[400].AFFILIATE_CODE_CREATION_DISABLED:
					errorMsg = 'O código de criação do afiliado foi desativado';
				case errorCatalog[400].AFFILIATE_ACTIVE_CODE_LIMIT_REACHED:
					errorMsg = 'O limite para criação de código foi atingido';
				case errorCatalog[400].AFFILIATE_CODE_LIFETIME_OUT_OF_RANGE:
					errorMsg = 'Código de afiliado fora do intervalo (válido por tempo indeterminado)';
				case errorCatalog[400].AFFILIATE_MAX_USES_PER_CUSTOMER_OUT_OF_RANGE:
					errorMsg = 'Uso por usuário foi atingido';
				case errorCatalog[400].PROMOTION_CODE_ALREADY_EXISTS:
					errorMsg = 'Código de promoção já existe';
				case errorCatalog[404].AFFILIATE_NOT_FOUND:
					errorMsg = 'Afiliado não encontrado';
				case errorCatalog[404].AFFILIATE_PROGRAM_SETTINGS_NOT_FOUND:
					errorMsg = 'Configurações do afiliado não foram encontradas';
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
