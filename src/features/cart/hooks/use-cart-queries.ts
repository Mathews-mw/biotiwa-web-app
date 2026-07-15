import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { cartQueryKeys } from '../api/cart-query-keys';
import { clearCart, getCart, saveCartSelection } from '../api/cart-api';

import type { IClearCartInput, ISaveCartSelectionInput } from '../types/cart-api-types';

export function useCartQuery(userId: string | null) {
	return useQuery({
		queryKey: userId ? cartQueryKeys.byUser(userId) : [...cartQueryKeys.all, 'empty'],
		queryFn: () => {
			if (!userId) {
				throw new Error('User ID is required.');
			}

			return getCart({ userId });
		},
		enabled: Boolean(userId),
		staleTime: 1000 * 30,
	});
}

export function useSaveCartSelectionMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: ISaveCartSelectionInput) => {
			return saveCartSelection(input);
		},
		onSuccess: (data) => {
			queryClient.setQueryData(cartQueryKeys.byUser(data.cart.userId), {
				cart: data.cart,
			});

			queryClient.invalidateQueries({
				queryKey: cartQueryKeys.all,
			});
		},
	});
}

export function useClearCartMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: IClearCartInput) => {
			return clearCart(input);
		},
		onSuccess: (_data, variables) => {
			queryClient.setQueryData(cartQueryKeys.byUser(variables.userId), {
				cart: null,
			});

			queryClient.invalidateQueries({
				queryKey: cartQueryKeys.all,
			});
		},
	});
}
