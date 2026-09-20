import { clientApi } from '@/lib/http/client-api';

import type { ICountryCode } from '@/core/types/country-code';
import type { ICheckoutSession } from '../types/checkout.types';

interface IRequest {
	customer: {
		name: string;
		email: string;
		phone?: string;
		document?: string;
		birthDate?: string | Date;
	};
	shippingAddress: {
		zipCode: string;
		street: string;
		number?: string;
		complement?: string;
		district?: string;
		city: string;
		state: string;
		countryCode: ICountryCode;
	};
	shippingRateId: string;
}

type IResponse = ICheckoutSession;

export async function createCheckoutSessionRequest(input: IRequest): Promise<IResponse> {
	const response = await clientApi
		.post('/checkout/sessions', {
			json: {
				customer: {
					name: input.customer.name,
					email: input.customer.email,
					phone: input.customer.phone,
					document: input.customer.document,
					birth_date: input.customer.birthDate,
				},
				shipping_address: {
					zip_code: input.shippingAddress.zipCode,
					street: input.shippingAddress.street,
					number: input.shippingAddress.number,
					complement: input.shippingAddress.complement,
					district: input.shippingAddress.district,
					city: input.shippingAddress.city,
					state: input.shippingAddress.state,
					country_code: input.shippingAddress.countryCode,
				},
				shipping_rate_id: input.shippingRateId,
			},
		})
		.json<IResponse>();

	return response;
}
