export const referralQueryKeys = {
	all: ['referral'] as const,
	current: () => [...referralQueryKeys.all, 'current'] as const,
};
