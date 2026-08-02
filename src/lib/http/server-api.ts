import 'server-only';

import ky, { isHTTPError } from 'ky';
import { cookies } from 'next/headers';

import { env } from '@/env';
import { ApiExceptionsError } from './api-exceptions-error';

export async function serverApi() {
	const cookieStore = await cookies();

	const cookieHeader = cookieStore
		.getAll()
		.map((cookie) => `${cookie.name}=${cookie.value}`)
		.join('; ');

	return ky.create({
		prefix: `${env.APP_URL}/api`,
		credentials: 'include',
		headers: {
			...(cookieHeader ? { cookie: cookieHeader } : {}),
		},
		timeout: 1000 * 30, // 30 seconds
		hooks: {
			beforeError: [
				async ({ error }) => {
					if (isHTTPError(error)) {
						if (typeof error.data === 'object' && error.data !== null) {
							const errorData = error.data as { code: string; message: string; status: number };

							throw new ApiExceptionsError(errorData.message, errorData.code, errorData.status);
						}
					}

					return error;
				},
			],
		},
	});
}
