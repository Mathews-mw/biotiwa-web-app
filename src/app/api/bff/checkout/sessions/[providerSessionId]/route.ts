import type { NextRequest } from 'next/server';

import { proxyApiRequest } from '@/lib/bff/api-proxy';

type RouteParams = {
	params: Promise<{
		providerSessionId: string;
	}>;
};

export async function GET(request: NextRequest, { params }: RouteParams) {
	const { providerSessionId } = await params;

	return proxyApiRequest({
		request,
		apiPath: `/checkout/sessions/${providerSessionId}`,
		method: 'GET',
	});
}
