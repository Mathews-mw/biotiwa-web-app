import {
	CHECKOUT_DRAFT_BROADCAST_CHANNEL,
	CHECKOUT_DRAFT_CUSTOM_EVENT,
	CHECKOUT_DRAFTS_STORAGE_KEY,
} from '../constants/checkout-storage';

import type { ICheckoutDraft } from '../types/checkout-draft';

type StoredCheckoutDrafts = Record<string, ICheckoutDraft>;

export function getStoredCheckoutDrafts(): StoredCheckoutDrafts {
	if (typeof window === 'undefined') {
		return {};
	}

	const rawDrafts = window.localStorage.getItem(CHECKOUT_DRAFTS_STORAGE_KEY);

	if (!rawDrafts) {
		return {};
	}

	try {
		const parsedDrafts = JSON.parse(rawDrafts);

		if (!parsedDrafts || typeof parsedDrafts !== 'object') {
			return {};
		}

		return parsedDrafts as StoredCheckoutDrafts;
	} catch {
		return {};
	}
}

export function getStoredCheckoutDraft(userId: string) {
	const drafts = getStoredCheckoutDrafts();

	return drafts[userId] ?? null;
}

export function storeCheckoutDraft(draft: ICheckoutDraft, sourceId?: string) {
	if (typeof window === 'undefined') {
		return;
	}

	const drafts = getStoredCheckoutDrafts();

	window.localStorage.setItem(
		CHECKOUT_DRAFTS_STORAGE_KEY,
		JSON.stringify({
			...drafts,
			[draft.userId]: draft,
		})
	);

	emitCheckoutDraftChanged(draft.userId, sourceId);
}

export function clearStoredCheckoutDraft(userId: string, sourceId?: string) {
	if (typeof window === 'undefined') {
		return;
	}

	const drafts = getStoredCheckoutDrafts();

	delete drafts[userId];

	window.localStorage.setItem(CHECKOUT_DRAFTS_STORAGE_KEY, JSON.stringify(drafts));

	emitCheckoutDraftChanged(userId, sourceId);
}

function emitCheckoutDraftChanged(userId: string, sourceId?: string) {
	if (typeof window === 'undefined') {
		return;
	}

	const payload = {
		type: 'CHECKOUT_DRAFT_CHANGED',
		userId,
		sourceId,
		occurredAt: new Date().toISOString(),
	};

	try {
		const channel = new BroadcastChannel(CHECKOUT_DRAFT_BROADCAST_CHANNEL);

		channel.postMessage(payload);
		channel.close();
	} catch {
		window.dispatchEvent(
			new CustomEvent(CHECKOUT_DRAFT_CUSTOM_EVENT, {
				detail: payload,
			})
		);
	}
}
