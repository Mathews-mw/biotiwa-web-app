export interface IAuthUser {
	id: string;
	name: string;
	email: string;
	createdAt: string;
}

export interface IAuthSession {
	user: IAuthUser;
	createdAt: string;
}

export interface ILoginInput {
	email: string;
	password: string;
}

export interface IRegisterInput {
	name: string;
	email: string;
	password: string;
}

export interface IAuthSessionResponse {
	session: IAuthSession | null;
}
