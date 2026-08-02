import { ICheckoutQuoteInput, IGetOffersParams } from '../api/commerce-api-types';

export const commerceQueryKeys = {
	all: ['commerce'] as const,

	offers: (params: IGetOffersParams) => {
		return [...commerceQueryKeys.all, 'offers', params] as const;
	},

	quote: (input: ICheckoutQuoteInput) => {
		return [...commerceQueryKeys.all, 'quote', input] as const;
	},

	quoteEmpty: () => {
		return [...commerceQueryKeys.all, 'quote', 'empty'] as const;
	},
};
