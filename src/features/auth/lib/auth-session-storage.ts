import { AUTH_SESSION_CHANGED_EVENT } from '../constants/auth-events';
import {
	AUTH_BROADCAST_CHANNEL_KEY,
	AUTH_SESSION_STORAGE_KEY,
	AUTH_USERS_STORAGE_KEY,
} from '../constants/auth-storage';

import type { IAuthSession, IAuthUser } from '../types/auth-api-types';

type StoredUser = IAuthUser & {
	password: string;
};

export function getStoredSession(): IAuthSession | null {
	if (typeof window === 'undefined') {
		return null;
	}

	const rawSession = window.localStorage.getItem(AUTH_SESSION_STORAGE_KEY);

	if (!rawSession) {
		return null;
	}

	try {
		return JSON.parse(rawSession) as IAuthSession;
	} catch {
		return null;
	}
}

export function storeSession(session: IAuthSession) {
	if (typeof window === 'undefined') {
		return;
	}

	window.localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(session));

	emitAuthSessionChanged();
}

export function clearStoredSession() {
	if (typeof window === 'undefined') {
		return;
	}

	window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);

	emitAuthSessionChanged();
}

export function getStoredUsers(): StoredUser[] {
	if (typeof window === 'undefined') {
		return [];
	}

	const rawUsers = window.localStorage.getItem(AUTH_USERS_STORAGE_KEY);

	if (!rawUsers) {
		return [];
	}

	try {
		const users = JSON.parse(rawUsers);

		if (!Array.isArray(users)) {
			return [];
		}

		return users as StoredUser[];
	} catch {
		return [];
	}
}

export function storeUsers(users: StoredUser[]) {
	if (typeof window === 'undefined') {
		return;
	}

	window.localStorage.setItem(AUTH_USERS_STORAGE_KEY, JSON.stringify(users));
}

export function emitAuthSessionChanged() {
	if (typeof window === 'undefined') {
		return;
	}

	try {
		const channel = new BroadcastChannel(AUTH_BROADCAST_CHANNEL_KEY);

		channel.postMessage({
			type: 'AUTH_SESSION_CHANGED',
			occurredAt: new Date().toISOString(),
		});

		channel.close();
	} catch {
		window.dispatchEvent(new Event(AUTH_SESSION_CHANGED_EVENT));
	}
}
