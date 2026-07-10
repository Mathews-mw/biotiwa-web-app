import { ICheckoutQuoteInput, IGetOffersParams } from './commerce-api-types';

export const commerceQueryKeys = {
	all: ['commerce'] as const,

	offers: (params: IGetOffersParams) => {
		return [...commerceQueryKeys.all, 'offers', params] as const;
	},

	quote: (input: ICheckoutQuoteInput) => {
		return [...commerceQueryKeys.all, 'checkout-quote', input] as const;
	},
};
