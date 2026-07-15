import type { IMarketCode, IOrderSummary } from '@/features/commerce/types/commerce';

export interface ICart {
	id: string;
	userId: string;
	market: IMarketCode;
	offerId: string;
	includeOrderBump: boolean;
	summary: IOrderSummary;
	updatedAt: string;
}

export interface IGetCartInput {
	userId: string;
}

export interface IGetCartResponse {
	cart: ICart | null;
}

export interface ISaveCartSelectionInput {
	userId: string;
	market: IMarketCode;
	offerId: string;
	includeOrderBump: boolean;
}

export interface ISaveCartSelectionResponse {
	cart: ICart;
}

export interface IClearCartInput {
	userId: string;
}
