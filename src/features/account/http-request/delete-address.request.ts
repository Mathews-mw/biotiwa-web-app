import { clientApi } from '@/lib/http/client-api';

interface IRequest {
	addressId: string;
}

export async function deleteAddressRequest(
	{ addressId }: IRequest,
	options: { headers?: Record<string, string> } = {}
): Promise<void> {
	const { headers } = options;

	const headersOptions: Record<string, string> = { ...headers };

	await clientApi.delete(`/users/address/${addressId}/delete`, {
		headers: headersOptions,
	});
}
