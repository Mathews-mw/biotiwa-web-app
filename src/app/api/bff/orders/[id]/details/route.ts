import type { NextRequest } from 'next/server';

import { proxyApiRequest } from '@/lib/bff/api-proxy';

type RouteParams = {
	params: Promise<{
		id: string;
	}>;
};

export async function GET(request: NextRequest, { params }: RouteParams) {
	const { id } = await params;

	return proxyApiRequest({
		request,
		apiPath: `/orders/${id}`,
		method: 'GET',
	});
}
