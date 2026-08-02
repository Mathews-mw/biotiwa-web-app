import { SearchParamsOption } from 'ky';

import { IAddress } from '../types/address.types';
import { clientApi } from '@/lib/http/client-api';

interface IRequest {
	isDefault?: boolean;
}

export type IResponse = Array<IAddress>;

export async function getUserAddressesRequests({ isDefault }: IRequest): Promise<IResponse> {
	const params = {
		is_default: isDefault,
	};

	const cleanParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null)) as SearchParamsOption;

	const response = await clientApi
		.get('/users/address', {
			searchParams: cleanParams,
		})
		.json<IResponse>();

	return response;
}
