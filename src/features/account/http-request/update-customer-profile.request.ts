import { clientApi } from '@/lib/http/client-api';
import { ICustomerProfile } from '../types/user.types';

interface IRequest {
	profileId: string;
	preferredMarket?: string;
	phone?: string;
	birthDate?: Date | string;
	document?: string;
}

export interface IResponse {
	message: string;
	customer_profile: ICustomerProfile;
}

export async function updateCustomerProfileRequest(
	{ profileId, preferredMarket, phone, birthDate, document }: IRequest,
	options: { headers?: Record<string, string> } = {}
): Promise<IResponse> {
	const { headers } = options;

	const headersOptions: Record<string, string> = { ...headers };

	const response = await clientApi
		.put(`/users/profile/${profileId}/update`, {
			headers: headersOptions,
			json: {
				preferred_market: preferredMarket,
				phone,
				birth_date: birthDate,
				document,
			},
		})
		.json<IResponse>();

	return response;
}
