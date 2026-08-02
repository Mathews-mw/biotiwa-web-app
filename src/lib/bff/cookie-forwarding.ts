'use server';

import type { NextRequest } from 'next/server';

export function getCookieHeaderFromRequest(request: NextRequest) {
	const cookieHeader = request.headers.get('cookie');

	return cookieHeader ?? '';
}
