import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { ILoginInput } from '../types/auth-api-types';

import { getCurrentSession } from '../api/auth-api';
import { authQueryKeys } from '../api/auth-query-keys';
import { emitAuthBroadcastEvent } from '../lib/auth-broadcast';
import { signOutRequest } from '../http-request/signout.request';
import { clearStoredSession } from '../lib/auth-session-storage';
import { ApiExceptionsError } from '@/lib/http/api-exceptions-error';
import { clearStoredSessionId } from '@/features/tracking/lib/tracking-storage';
import { signInCredentialsRequest } from '../http-request/signin-credentials.request';

export function useSessionQuery() {
	return useQuery({
		queryKey: authQueryKeys.session(),
		queryFn: getCurrentSession,
		staleTime: 1000 * 30,
		retry: false,
	});
}

export function useLoginMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: ILoginInput) => signInCredentialsRequest(input),
		onSuccess: (data) => {
			queryClient.setQueryData(authQueryKeys.session(), data);

			queryClient.invalidateQueries({
				queryKey: authQueryKeys.session(),
			});

			emitAuthBroadcastEvent('AUTH_SIGNED_IN');
		},
		onError: (error) => {
			let errorMsg = '';

			if (error instanceof ApiExceptionsError) {
				errorMsg = error.message;
			}

			errorMsg = 'Erro inesperado. Por favor, tente novamente mais tarde';

			toast.error(errorMsg);
		},
	});
}

export function useLogoutMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: signOutRequest,
		onSuccess: () => {
			queryClient.setQueryData(authQueryKeys.session(), {
				session: null,
			});

			queryClient.invalidateQueries({ queryKey: authQueryKeys.session() });

			clearStoredSession();
			clearStoredSessionId();
			emitAuthBroadcastEvent('AUTH_SIGNED_OUT');
		},
		onError: (error) => {
			let errorMsg = '';

			if (error instanceof ApiExceptionsError) {
				errorMsg = error.message;
			}

			errorMsg = 'Erro inesperado. Por favor, tente novamente mais tarde';

			toast.error(errorMsg);
		},
	});
}
