import ky, { isHTTPError } from 'ky';

import { ApiExceptionsError } from './api-exceptions-error';

export const clientApi = ky.create({
	prefix: 'http://localhost:3000/api/bff',
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
