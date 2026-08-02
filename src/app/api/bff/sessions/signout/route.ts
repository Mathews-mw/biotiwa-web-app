import { NextRequest } from 'next/server';
import { proxyApiRequest } from '@/lib/bff/api-proxy';

export async function PATCH(request: NextRequest) {
	if (request.method !== 'PATCH') {
		return Response.json(
			{
				error: 'Method not allowed!',
			},
			{ status: 405 }
		);
	}

	return proxyApiRequest({
		request,
		apiPath: '/sessions/signout',
		method: 'PATCH',
		body: {},
	});
}
