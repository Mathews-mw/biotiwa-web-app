import { IMarketCode } from '@/features/commerce/types/commerce';

export interface IAddress {
	id: string;
	user_id: string;
	market: IMarketCode;
	label?: string | null;
	recipient?: string | null;
	postal_code: string;
	address_line_1: string;
	number?: string | null;
	address_line_2?: string | null;
	district?: string | null;
	city: string;
	state: string;
	country: string;
	is_default: boolean;
	created_at: Date;
	updated_at?: Date | null;
}
