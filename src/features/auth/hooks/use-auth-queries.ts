import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { authQueryKeys } from '../api/auth-query-keys';
import { getCurrentSession, login, logout, register } from '../api/auth-api';

import type { ILoginInput, IRegisterInput } from '../types/auth-api-types';

export function useSessionQuery() {
	return useQuery({
		queryKey: authQueryKeys.session(),
		queryFn: getCurrentSession,
		staleTime: 1000 * 30,
	});
}

export function useLoginMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: ILoginInput) => login(input),
		onSuccess: (data) => {
			queryClient.setQueryData(authQueryKeys.session(), data);
			queryClient.invalidateQueries({ queryKey: authQueryKeys.session() });
		},
	});
}

export function useRegisterMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: IRegisterInput) => register(input),
		onSuccess: (data) => {
			queryClient.setQueryData(authQueryKeys.session(), data);
			queryClient.invalidateQueries({ queryKey: authQueryKeys.session() });
		},
	});
}

export function useLogoutMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: logout,
		onSuccess: () => {
			queryClient.setQueryData(authQueryKeys.session(), {
				session: null,
			});

			queryClient.invalidateQueries({ queryKey: authQueryKeys.session() });
		},
	});
}
