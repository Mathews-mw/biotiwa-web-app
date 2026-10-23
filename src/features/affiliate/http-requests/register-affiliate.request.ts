import { serverApi } from '@/lib/http/server-api';
import { IAffiliate, IAffiliateType } from '../types/affiliate.types';

interface IRequest {
	type: IAffiliateType;
}

interface IResponse {
	message: string;
	affiliate: IAffiliate;
}

export async function registerAffiliateRequest(
	payload: IRequest,
	options: { headers?: Record<string, string> } = {}
): Promise<IResponse> {
	const { type } = payload;
	const { headers } = options;

	const headersOptions: Record<string, string> = { ...headers };

	const api = await serverApi();

	const response = await api
		.post('/affiliates/register', {
			headers: headersOptions,
			json: {
				type,
			},
		})
		.json<IResponse>();

	return response;
}
