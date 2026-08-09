import { IMarketCode } from '@/features/commerce/types/commerce-entity-types';

import { clientApi } from '@/lib/http/client-api';
import { serverApi } from '@/lib/http/server-api';

interface IRequest {
	market: string;
	label?: string | null;
	recipient?: string | null;
	postalCode: string;
	addressLine1: string;
	number?: string | null;
	addressLine2?: string | null;
	district?: string | null;
	city: string;
	state: string;
	country: string;
	isDefault?: boolean;
}

interface IResponse {
	message: string;
	user_id: string;
}

export async function registerAddressRequest(
	payload: IRequest,
	options: { headers?: Record<string, string> } = {}
): Promise<IResponse> {
	const {
		market,
		label,
		recipient,
		postalCode,
		addressLine1,
		number,
		addressLine2,
		district,
		city,
		state,
		country,
		isDefault,
	} = payload;
	const { headers } = options;

	const headersOptions: Record<string, string> = { ...headers };

	const api = await serverApi();

	const response = await api
		.post('/users/address', {
			headers: headersOptions,
			json: {
				market,
				label,
				recipient,
				postal_code: postalCode,
				address_line_1: addressLine1,
				number,
				address_line_2: addressLine2,
				district,
				city,
				state,
				country,
				is_default: isDefault,
			},
		})
		.json<IResponse>();

	return response;
}
