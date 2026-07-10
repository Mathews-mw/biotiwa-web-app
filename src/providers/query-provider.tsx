'use client';

import { useState, type ReactNode } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type QueryProviderProps = {
	children: ReactNode;
};

export function QueryProvider({ children }: QueryProviderProps) {
	const [queryClient] = useState(() => {
		return new QueryClient({
			defaultOptions: {
				queries: {
					staleTime: 1000 * 60,
					gcTime: 1000 * 60 * 10,
					retry: 1,
					refetchOnWindowFocus: false,
				},
				mutations: {
					retry: 0,
				},
			},
		});
	});

	return (
		<QueryClientProvider client={queryClient}>
			{children}

			{process.env.NODE_ENV === 'development' ? <ReactQueryDevtools initialIsOpen={false} /> : null}
		</QueryClientProvider>
	);
}
