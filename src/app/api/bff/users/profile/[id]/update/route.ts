import type { NextRequest } from 'next/server';

import { proxyApiRequest } from '@/lib/bff/api-proxy';

interface IParamsProps {
	params: {
		id: string;
	};
}

export async function PUT(request: NextRequest, { params }: IParamsProps) {
	if (request.method !== 'PUT') {
		return Response.json(
			{
				error: 'Method not allowed!',
			},
			{ status: 405 }
		);
	}

	const { id } = await params;
	const body = await request.json();

	return proxyApiRequest({
		request,
		apiPath: `/users/profile/${id}`,
		method: 'PUT',
		body,
	});
}
