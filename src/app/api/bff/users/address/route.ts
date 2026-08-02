import type { NextRequest } from 'next/server';

import { proxyApiRequest } from '@/lib/bff/api-proxy';

export async function GET(request: NextRequest) {
	if (request.method !== 'GET') {
		return Response.json(
			{
				error: 'Method not allowed!',
			},
			{ status: 405 }
		);
	}

	return proxyApiRequest({
		request,
		apiPath: '/users/address',
		method: 'GET',
	});
}
