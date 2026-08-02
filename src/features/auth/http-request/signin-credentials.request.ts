import { clientApi } from '@/lib/http/client-api';
import type { IUser } from '@/features/account/types/user.types';

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	message: string;
	user: IUser;
}

export async function signInCredentialsRequest({ email, password }: IRequest): Promise<IResponse> {
	const response = await clientApi
		.post('/sessions/signin', {
			json: {
				email,
				password,
			},
		})
		.json<IResponse>();

	return response;
}
