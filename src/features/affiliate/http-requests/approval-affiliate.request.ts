import { clientApi } from '@/lib/http/client-api';
import type { IAffiliateStatus } from '../types/affiliate.types';

interface IRequest {
	affiliateId: string;
	decision: 'APPROVE' | 'REJECT';
}

export interface IResponse {
	message: string;
	affiliate: {
		id: string;
		status: IAffiliateStatus;
	};
}

export async function approvalAffiliateRequest(
	{ affiliateId, decision }: IRequest,
	options: { headers?: Record<string, string> } = {}
): Promise<IResponse> {
	const { headers } = options;

	const headersOptions: Record<string, string> = { ...headers };

	const response = await clientApi
		.patch(`/affiliates/${affiliateId}/approval`, {
			headers: headersOptions,
			json: {
				decision,
			},
		})
		.json<IResponse>();

	return response;
}
