import { useQuery } from '@tanstack/react-query';

import { addressQueryKeys } from '../query-keys/account-query-keys';
import { getUserAddressesRequests } from '../http-request/get-user-addresses.request';

export function useGetUserAddresses(params: { userId?: string; isDefault?: boolean }) {
	const { userId, isDefault } = params;

	return useQuery({
		queryKey: addressQueryKeys.userAddresses(userId, isDefault),
		queryFn: async () => await getUserAddressesRequests({ isDefault }),
		enabled: !!userId,
	});
}
