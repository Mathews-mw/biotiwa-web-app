import ky, { isHTTPError } from 'ky';

import { ApiExceptionsError } from './api-exceptions-error';
import { env } from '@/env';

export const clientApi = ky.create({
	prefix: `${env.NEXT_PUBLIC_APP_BASE_URL}/api/bff`,
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
	},
});
