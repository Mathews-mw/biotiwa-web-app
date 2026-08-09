import { IMarketCode } from '@/features/commerce/types/commerce-entity-types';

export interface IUser {
	id: string;
	name: string;
	email: string;
	email_verified: boolean;
	image?: string | null;
	role: string;
	created_at: Date;
}

export interface ICustomerProfile {
	id: string;
	user_id: string;
	preferred_market?: IMarketCode | null;
	phone?: string | null;
	birth_date?: string | null;
	document?: string | null;
	created_at: Date;
	updated_at?: Date | null;
}

export interface IUserProfile extends IUser {
	profile: ICustomerProfile;
}
