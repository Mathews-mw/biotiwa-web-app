import { clientApi } from '@/lib/http/client-api';

interface IRequest {
	addressId: string;
}

export interface IResponse {
	message: string;
}

export async function setAddressAsDefaultRequest(
	{ addressId }: IRequest,
	options: { headers?: Record<string, string> } = {}
): Promise<IResponse> {
	const { headers } = options;

	const headersOptions: Record<string, string> = { ...headers };

	const response = await clientApi
		.patch(`/users/address/${addressId}/set-as-default`, {
			headers: headersOptions,
		})
		.json<IResponse>();

	return response;
}
