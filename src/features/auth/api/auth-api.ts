import {
	clearStoredSession,
	getStoredSession,
	getStoredUsers,
	storeSession,
	storeUsers,
} from '../lib/auth-session-storage';

import type {
	IAuthSession,
	IAuthSessionResponse,
	IAuthUser,
	ILoginInput,
	IRegisterInput,
} from '../types/auth-api-types';

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeEmail(email: string) {
	return email.trim().toLowerCase();
}

export async function getCurrentSession(): Promise<IAuthSessionResponse> {
	await sleep(180);

	return {
		session: getStoredSession(),
	};
}

export async function register(input: IRegisterInput): Promise<IAuthSessionResponse> {
	await sleep(500);

	const users = getStoredUsers();
	const email = normalizeEmail(input.email);

	const alreadyExists = users.some((user) => {
		return normalizeEmail(user.email) === email;
	});

	if (alreadyExists) {
		throw new Error('Este e-mail já está cadastrado.');
	}

	const user: IAuthUser = {
		id: crypto.randomUUID(),
		name: input.name.trim(),
		email,
		createdAt: new Date().toISOString(),
	};

	storeUsers([
		...users,
		{
			...user,
			password: input.password,
		},
	]);

	const session: IAuthSession = {
		user,
		createdAt: new Date().toISOString(),
	};

	storeSession(session);

	return {
		session,
	};
}

export async function login(input: ILoginInput): Promise<IAuthSessionResponse> {
	await sleep(450);

	const users = getStoredUsers();
	const email = normalizeEmail(input.email);

	const user = users.find((storedUser) => {
		return normalizeEmail(storedUser.email) === email;
	});

	if (!user || user.password !== input.password) {
		throw new Error('E-mail ou senha inválidos.');
	}

	const session: IAuthSession = {
		user: {
			id: user.id,
			name: user.name,
			email: user.email,
			createdAt: user.createdAt,
		},
		createdAt: new Date().toISOString(),
	};

	storeSession(session);

	return {
		session,
	};
}

export async function logout() {
	await sleep(180);

	clearStoredSession();

	return {
		ok: true,
	};
}
