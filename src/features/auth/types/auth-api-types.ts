import type { IUserProfile } from '@/features/account/types/user.types';

export type IUserRole = 'CUSTOMER' | 'ADMIN';

export type IAuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export interface IAuthUser {
	id: string;
	name: string;
	email: string;
	email_verified: boolean;
	image?: string | null;
	role?: IUserRole | null;
	created_at: string | Date;
}

export interface IAuthSession {
	user: IUserProfile;
}

export interface IAuthSessionResponse {
	session: IAuthSession | null;
}

export interface ILoginInput {
	email: string;
	password: string;
}

export interface IRegisterInput {
	name: string;
	email: string;
	password: string;
	image?: string;
	userConsents: Array<{
		type: string;
		version: string;
	}>;
}

export type LoginInput = {
	email: string;
	password: string;
};

export type RegisterApiResponse = {
	message: string;
	user_id: string;
};

export type LoginApiResponse = {
	message: string;
	user: IAuthUser;
};
