import type { IActionResponse } from '@/core/actions/action-response-type';
import type { ICheckoutSummary } from '@/features/checkout/types/checkout.types';

import errorCatalog from '@/core/constants/error-catalog';
import { ApiExceptionsError } from '@/lib/http/api-exceptions-error';
import { applyPromotionCodeRequest } from '@/features/checkout/http-requests/calculate-checkout-summary.request';

export async function applyPromotionCodeAction(input: {
	shippingRateId?: string;
	promotionCode?: string;
}): Promise<IActionResponse<ICheckoutSummary>> {
	console.log('apply promotion action input: ', input);

	try {
		const response = await applyPromotionCodeRequest({
			shippingRateId: input.shippingRateId,
			promotionCode: input.promotionCode,
		});

		console.log('action response: ', response);

		return {
			success: true,
			message: 'Cupom aplicado com sucesso',
			data: response,
			errors: null,
		};
	} catch (error) {
		console.log('set address as default error: ', error);
		if (error instanceof ApiExceptionsError) {
			let errorMsg = 'Não foi possível aplicar o código';

			switch (error.code) {
				case errorCatalog[404].PROMOTION_CODE_NOT_FOUND:
					errorMsg = 'Código não encontrado.';
					break;
				case errorCatalog[400].PROMOTION_CODE_EXPIRED:
					errorMsg = 'Este código expirou.';
					break;
				case errorCatalog[400].PROMOTION_CODE_INACTIVE:
					errorMsg = 'Este código não está mais ativo.';
					break;
				case errorCatalog[400].PROMOTION_CODE_USAGE_LIMIT_REACHED:
					errorMsg = 'Este código atingiu o limite de utilizações.';
					break;
				case errorCatalog[400].PROMOTION_CODE_CUSTOMER_USAGE_LIMIT_REACHED:
					errorMsg = 'Você já atingiu o limite de utilizações deste código.';
					break;
				case errorCatalog[400].AFFILIATE_SELF_REDEMPTION_NOT_ALLOWED:
					errorMsg = 'Você não pode utilizar seu próprio código de afiliado.';
					break;
				case errorCatalog[400].AFFILIATE_NOT_ACTIVE:
					errorMsg = 'Este código de afiliado não está disponível.';
					break;
				case errorCatalog[400].AFFILIATE_PROGRAM_NOT_ACTIVE:
					errorMsg = 'O programa de afiliados não está disponível no momento.';
				default:
					errorMsg = error.message;
			}

			return {
				success: false,
				message: errorMsg,
				data: null,
				errors: null,
			};
		}

		return {
			success: false,
			message: 'Erro inesperado. Por favor, tente novamente mais tarde',
			data: null,
			errors: null,
		};
	}
}
