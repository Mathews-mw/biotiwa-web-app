import type { NextRequest } from 'next/server';

import { proxyApiRequest } from '@/lib/bff/api-proxy';

interface IParamsProps {
	params: {
		id: string;
	};
}

export async function PATCH(request: NextRequest, { params }: IParamsProps) {
	if (request.method !== 'PATCH') {
		return Response.json(
			{
				error: 'Method not allowed!',
			},
			{ status: 405 }
		);
	}

	const { id: cartItemId } = await params;

	const body = await request.json();

	return proxyApiRequest({
		request,
		apiPath: `/cart/item/${cartItemId}/quantity`,
		method: 'PATCH',
		body,
	});
}
