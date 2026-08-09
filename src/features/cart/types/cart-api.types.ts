import type { IMarketCode } from '@/features/commerce/types/commerce-entity-types';

export type IAddCartItemInput =
	| {
			type: 'OFFER';
			marketCode: IMarketCode;
			offerId: string;
			quantity?: number;
	  }
	| {
			type: 'ORDER_BUMP';
			marketCode: IMarketCode;
			orderBumpId: string;
			quantity?: number;
	  };
