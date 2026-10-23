'use server';

import z from 'zod';

import type { IActionResponse } from '@/core/actions/action-response-type';

import errorCatalog from '@/core/constants/error-catalog';
import { getCookieHeader } from '@/lib/http/get-cookie-header';
import { ApiExceptionsError } from '@/lib/http/api-exceptions-error';
import { approvalAffiliateRequest } from '../http-requests/approval-affiliate.request';
import {
	approvalAffiliateFormSchema,
	type IApprovalAffiliateFormInput,
} from './form-schemas/approval-affiliate-schema';

export async function approvalAffiliateAction({
	affiliateId,
	data,
}: {
	affiliateId: string;
	data: IApprovalAffiliateFormInput;
}): Promise<IActionResponse> {
	const parseDataResult = approvalAffiliateFormSchema.safeParse(data);

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

	const { decision } = parseDataResult.data;

	try {
		const serverCookies = await getCookieHeader();

		await approvalAffiliateRequest(
			{
				affiliateId,
				decision,
			},
			{
				headers: {
					cookie: serverCookies,
				},
			}
		);

		const approvalStatusFormatted = decision === 'APPROVE' ? 'approved' : 'rejected';

		return {
			success: true,
			message: `Afiliado ${approvalStatusFormatted} com sucesso`,
			data: null,
			errorCode: null,
			fieldErrors: null,
		};
	} catch (error) {
		if (error instanceof ApiExceptionsError) {
			let errorMsg = '';

			switch (error.code) {
				case errorCatalog[400].AFFILIATE_REGISTRATION_ALREADY_REVIEWED:
					errorMsg = 'A aprovação do afiliado já foi realizada';
				case errorCatalog[404].USER_NOT_FOUND:
					errorMsg = 'Afiliado não encontrado';
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
