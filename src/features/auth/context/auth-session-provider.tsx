'use client';

import { createContext, ReactNode, useMemo } from 'react';

import type { IAuthStatus } from '../types/auth-api-types';
import type { IUserProfile } from '@/features/account/types/user.types';

import { useSessionQuery } from '../hooks/use-auth-queries';
import { AuthSessionSync } from '../components/auth-session-sync';

interface AuthSessionContextValue {
	user: IUserProfile | null;
	status: IAuthStatus;
	isAuthenticated: boolean;
	isLoading: boolean;
	refetchSession: () => void;
}

type AuthSessionProviderProps = {
	children: ReactNode;
};

export const AuthSessionContext = createContext<AuthSessionContextValue | null>(null);

export function AuthSessionProvider({ children }: AuthSessionProviderProps) {
	const sessionQuery = useSessionQuery();

	const user = sessionQuery.data?.session?.user ?? null;

	const status: IAuthStatus = sessionQuery.isPending ? 'loading' : user ? 'authenticated' : 'unauthenticated';

	const contextValue = useMemo<AuthSessionContextValue>(() => {
		return {
			user,
			status,
			isAuthenticated: status === 'authenticated',
			isLoading: status === 'loading',
			refetchSession: () => {
				void sessionQuery.refetch();
			},
		};
	}, [sessionQuery, status, user]);

	return (
		<AuthSessionContext.Provider value={contextValue}>
			<AuthSessionSync />
			{children}
		</AuthSessionContext.Provider>
	);
}
