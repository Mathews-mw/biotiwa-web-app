import { clientApi } from '@/lib/http/client-api';

interface IRequest {
	name: string;
	email: string;
	password: string;
	image?: string;
	userConsents: Array<{
		type: string;
		version: string;
	}>;
}

interface IResponse {
	message: string;
	user_id: string;
}

export async function registerUserRequest({
	name,
	email,
	password,
	image,
	userConsents,
}: IRequest): Promise<IResponse> {
	const response = await clientApi
		.post('/users/register', {
			json: {
				name,
				email,
				image,
				password,
				user_consents: userConsents,
			},
		})
		.json<IResponse>();

	console.log('register user response: ', response);

	return response;
}
