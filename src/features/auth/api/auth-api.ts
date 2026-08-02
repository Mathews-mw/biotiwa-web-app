import type { IAuthSessionResponse } from '../types/auth-api-types';

import { clearStoredSession } from '../lib/auth-session-storage';
import { ApiExceptionsError } from '@/lib/http/api-exceptions-error';
import { getCurrentSessionRequest } from '../http-request/get-current-session.request';

export async function getCurrentSession(): Promise<IAuthSessionResponse> {
	try {
		const user = await getCurrentSessionRequest();

		return {
			session: {
				user,
			},
		};
	} catch (error) {
		if (error instanceof ApiExceptionsError && error.status === 401) {
			return {
				session: null,
			};
		}

		throw error;
	}
}

export async function logout() {
	clearStoredSession();

	return {
		ok: true,
	};
}
