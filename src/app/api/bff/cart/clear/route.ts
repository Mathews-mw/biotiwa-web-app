import type { NextRequest } from 'next/server';

import { proxyApiRequest } from '@/lib/bff/api-proxy';

export async function DELETE(request: NextRequest) {
	if (request.method !== 'DELETE') {
		return Response.json(
			{
				error: 'Method not allowed!',
			},
			{ status: 405 }
		);
	}

	return proxyApiRequest({
		request,
		apiPath: '/cart/clear',
		method: 'DELETE',
		body: {},
	});
}
