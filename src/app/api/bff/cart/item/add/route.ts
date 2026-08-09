import type { NextRequest } from 'next/server';

import { proxyApiRequest } from '@/lib/bff/api-proxy';

export async function POST(request: NextRequest) {
	if (request.method !== 'POST') {
		return Response.json(
			{
				error: 'Method not allowed!',
			},
			{ status: 405 }
		);
	}

	const body = await request.json();

	return proxyApiRequest({
		request,
		apiPath: '/cart/item/add',
		method: 'POST',
		body,
	});
}
