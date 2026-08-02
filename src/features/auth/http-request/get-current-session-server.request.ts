import { serverApi } from '@/lib/http/server-api';
import type { IUser } from '@/features/account/types/user.types';

type IResponse = IUser;

export async function getCurrentSessionServer(): Promise<IResponse> {
	const api = await serverApi();

	const response = await api.get('/users/me').json<IResponse>();

	return response;
}
