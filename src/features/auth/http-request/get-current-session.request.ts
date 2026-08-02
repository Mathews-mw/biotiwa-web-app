import { clientApi } from '@/lib/http/client-api';
import type { IUserProfile } from '@/features/account/types/user.types';

type IResponse = IUserProfile;

export async function getCurrentSessionRequest(options: { headers?: Record<string, string> } = {}): Promise<IResponse> {
	const { headers } = options;

	const headersOptions: Record<string, string> = { ...headers };

	const response = await clientApi
		.get('/users/me', {
			headers: headersOptions,
		})
		.json<IResponse>();

	return response;
}
