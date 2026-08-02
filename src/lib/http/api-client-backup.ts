import ky, { isHTTPError } from 'ky';

import { env } from '@/env';
import { ApiExceptionsError } from './api-exceptions-error';

export const api = ky.create({
	prefix: `${env.NEXT_PUBLIC_API_BASE_URL}/api`,
	credentials: 'include',
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
		beforeRequest: [
			async ({ request }) => {
				let cookieHeader;

				// window === 'undefined' => indica que o trecho de código está rodando no server side
				if (typeof window === 'undefined') {
					const { getCookieHeader } = await import('./get-cookie-header');
					cookieHeader = await getCookieHeader();
					console.log('cookieHeader: ', cookieHeader);
				}

				if (cookieHeader) {
					request.headers.set('cookie', cookieHeader);
				}
			},
		],
	},
});
