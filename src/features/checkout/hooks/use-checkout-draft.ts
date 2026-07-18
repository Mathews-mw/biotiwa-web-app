'use client';

import type { FieldPath, UseFormReturn } from 'react-hook-form';
import { useCallback, useEffect, useRef, useState } from 'react';

import { clearStoredCheckoutDraft, getStoredCheckoutDraft, storeCheckoutDraft } from '../lib/checkout-draft-storage';

import type { ICheckoutDraftValues } from '../types/checkout-draft';
import type { ICheckoutFormData } from '../schemas/checkout-schema';
import { CHECKOUT_DRAFT_CUSTOM_EVENT, CHECKOUT_DRAFTS_STORAGE_KEY } from '../constants/checkout-storage';

type UseCheckoutDraftParams = {
	form: UseFormReturn<ICheckoutFormData>;
	userId: string | null;
	enabled?: boolean;
};

const draftFields: FieldPath<ICheckoutFormData>[] = [
	'market',
	'fullName',
	'email',
	'age',
	'sportPractice',
	'postalCode',
	'addressLine1',
	'number',
	'addressLine2',
	'district',
	'city',
	'state',
];

export function useCheckoutDraft({ form, userId, enabled = true }: UseCheckoutDraftParams) {
	const sourceIdRef = useRef(() => `checkout-draft-${Math.random().toString(36).slice(2)}`);

	const saveTimerRef = useRef<number | null>(null);
	const canPersistRef = useRef(false);
	const isApplyingDraftRef = useRef(false);

	const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
	const [hasDraft, setHasDraft] = useState(false);

	const applyDraft = useCallback(
		(values: ICheckoutDraftValues) => {
			isApplyingDraftRef.current = true;

			for (const field of draftFields) {
				const value = values[field as keyof ICheckoutDraftValues];

				if (value !== undefined) {
					form.setValue(field, value as never, {
						shouldDirty: false,
						shouldValidate: false,
					});
				}
			}

			form.setValue('acceptPrivacy', false, {
				shouldDirty: false,
				shouldValidate: false,
			});

			window.setTimeout(() => {
				isApplyingDraftRef.current = false;
			}, 0);
		},
		[form]
	);

	const persistCurrentDraft = useCallback(() => {
		if (!userId || !enabled || isApplyingDraftRef.current) {
			return;
		}

		const now = new Date().toISOString();

		const draft = {
			userId,
			values: pickDraftValues(form.getValues()),
			updatedAt: now,
		};

		storeCheckoutDraft(draft, sourceIdRef.current());

		setHasDraft(true);
		setLastSavedAt(now);
	}, [enabled, form, userId]);

	const clearDraft = useCallback(() => {
		if (!userId) {
			return;
		}

		clearStoredCheckoutDraft(userId, sourceIdRef.current());

		setHasDraft(false);
		setLastSavedAt(null);
	}, [userId]);

	useEffect(() => {
		if (!userId || !enabled) {
			return;
		}

		canPersistRef.current = false;

		const draft = getStoredCheckoutDraft(userId);

		let asyncStateTimer: number | undefined;

		if (draft) {
			applyDraft(draft.values);
			// Defer state updates to avoid synchronous setState within effect
			asyncStateTimer = window.setTimeout(() => {
				setHasDraft(true);
				setLastSavedAt(draft.updatedAt);
			}, 0);
		} else {
			asyncStateTimer = window.setTimeout(() => {
				setHasDraft(false);
				setLastSavedAt(null);
			}, 0);
		}

		window.setTimeout(() => {
			canPersistRef.current = true;
		}, 0);

		return () => {
			canPersistRef.current = false;
			if (asyncStateTimer) {
				window.clearTimeout(asyncStateTimer);
			}
		};
	}, [applyDraft, enabled, userId]);

	useEffect(() => {
		if (!userId || !enabled) {
			return;
		}

		const subscription = form.watch(() => {
			if (!canPersistRef.current || isApplyingDraftRef.current) {
				return;
			}

			if (saveTimerRef.current) {
				window.clearTimeout(saveTimerRef.current);
			}

			saveTimerRef.current = window.setTimeout(() => {
				persistCurrentDraft();
			}, 500);
		});

		return () => {
			subscription.unsubscribe();

			if (saveTimerRef.current) {
				window.clearTimeout(saveTimerRef.current);
			}
		};
	}, [enabled, form, persistCurrentDraft, userId]);

	useEffect(() => {
		if (!userId || !enabled) {
			return;
		}

		function syncDraftFromStorage() {
			const draft = getStoredCheckoutDraft(userId!);

			if (!draft) {
				setHasDraft(false);
				setLastSavedAt(null);
				return;
			}

			applyDraft(draft.values);
			setHasDraft(true);
			setLastSavedAt(draft.updatedAt);
		}

		function handleCustomEvent(event: Event) {
			const customEvent = event as CustomEvent<{
				userId: string;
				sourceId?: string;
			}>;

			if (customEvent.detail?.userId !== userId) {
				return;
			}

			if (customEvent.detail?.sourceId === sourceIdRef.current()) {
				return;
			}

			syncDraftFromStorage();
		}

		function handleStorage(event: StorageEvent) {
			if (event.key !== CHECKOUT_DRAFTS_STORAGE_KEY) {
				return;
			}

			syncDraftFromStorage();
		}

		window.addEventListener(CHECKOUT_DRAFT_CUSTOM_EVENT, handleCustomEvent);
		window.addEventListener('storage', handleStorage);

		return () => {
			window.removeEventListener(CHECKOUT_DRAFT_CUSTOM_EVENT, handleCustomEvent);
			window.removeEventListener('storage', handleStorage);
		};
	}, [applyDraft, enabled, userId]);

	useEffect(() => {
		if (!userId || !enabled) {
			return;
		}

		function handleBeforeUnload() {
			persistCurrentDraft();
		}

		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, [enabled, persistCurrentDraft, userId]);

	return {
		hasDraft,
		lastSavedAt,
		clearDraft,
	};
}

function pickDraftValues(values: ICheckoutFormData): ICheckoutDraftValues {
	const rawAge = values.age as unknown;

	const age = rawAge === '' || rawAge === undefined || rawAge === null ? undefined : Number(rawAge);

	return {
		market: values.market,
		fullName: values.fullName ?? '',
		email: values.email ?? '',
		age: Number.isNaN(age) ? undefined : age,
		sportPractice: values.sportPractice ?? '',
		postalCode: values.postalCode ?? '',
		addressLine1: values.addressLine1 ?? '',
		number: values.number ?? '',
		addressLine2: values.addressLine2 ?? '',
		district: values.district ?? '',
		city: values.city ?? '',
		state: values.state ?? '',
	};
}
