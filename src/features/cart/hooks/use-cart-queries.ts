import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { IAddCartItemInput } from '../types/cart-api.types';

import { cartQueryKeys } from '../api/cart-query-keys';
import errorCatalog from '@/core/constants/error-catalog';
import { emitCartBroadcastEvent } from '../lib/cart-broadcast';
import { ApiExceptionsError } from '@/lib/http/api-exceptions-error';
import { clearCartRequest } from '../http-requests/clear-cart.request';
import { addCartItemRequest } from '../http-requests/add-cart-item.request';
import { getActiveCartRequest } from '../http-requests/get-active-cart.request';
import { removeCartItemRequest } from '../http-requests/remove-cart-item.request';
import { updateCartItemQuantityRequest } from '../http-requests/update-cart-item-quantity.request';

export function useGetActiveCartQuery(options?: { enabled?: boolean }) {
	return useQuery({
		queryKey: cartQueryKeys.active(),
		queryFn: getActiveCartRequest,
		enabled: options?.enabled ?? true,
		staleTime: 1000 * 30,
		retry: false,
	});
}

export function useUpdateCartItemQuantityMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: { cartItemId: string; quantity: number }) => {
			return updateCartItemQuantityRequest(input);
		},
		onSuccess: (data) => {
			queryClient.setQueryData(cartQueryKeys.active(), data);
			emitCartBroadcastEvent('CART_UPDATED');
		},
	});
}

export function useAddCartItemMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: IAddCartItemInput) => addCartItemRequest(input),
		onSuccess: (data) => {
			queryClient.setQueryData(cartQueryKeys.active(), data);
			emitCartBroadcastEvent('CART_UPDATED');
		},
		onError: (error) => {
			if (error instanceof ApiExceptionsError) {
				let errorMsg = '';

				switch (error.code) {
					case errorCatalog[400].CART_QUANTITY_ZERO_ERROR:
						errorMsg = 'A quantidade deve ser maior que zero';
					case errorCatalog[400].CART_ITEM_DOES_NOT_BELONG_SELECT_MARKET:
						errorMsg = 'O item do carrinho não pertence ao mercado selecionado';
					case errorCatalog[404].RESOURCE_NOT_FOUND_ERROR:
						errorMsg = 'Item do carrinho não encontrado';
					case errorCatalog[500].INTERNAL_SERVER_ERROR:
						errorMsg = 'Ops! Não foi possível adicionar os itens ao carrinho. Por favor, tente novamente';
					default:
						errorMsg = error.message;
				}

				throw new Error(errorMsg);
			}

			throw error;
		},
	});
}

export function useRemoveCartItemMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: { cartItemId: string }) => removeCartItemRequest(input),
		onSuccess: (data) => {
			queryClient.setQueryData(cartQueryKeys.active(), data);
			emitCartBroadcastEvent('CART_UPDATED');
		},
	});
}

export function useClearCartMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: clearCartRequest,
		onSuccess: () => {
			queryClient.setQueryData(cartQueryKeys.active(), {
				cart: null,
			});

			emitCartBroadcastEvent('CART_CLEARED');
		},
	});
}
