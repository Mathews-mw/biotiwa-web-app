import type { NextRequest } from 'next/server';

import { proxyApiRequest } from '@/lib/bff/api-proxy';

interface IParamsProps {
	params: {
		id: string;
	};
}

export async function DELETE(request: NextRequest, { params }: IParamsProps) {
	if (request.method !== 'DELETE') {
		return Response.json(
			{
				error: 'Method not allowed!',
			},
			{ status: 405 }
		);
	}

	const { id: cartItemId } = await params;

	return proxyApiRequest({
		request,
		apiPath: `/cart/item/${cartItemId}/remove`,
		method: 'DELETE',
		body: {},
	});
}
