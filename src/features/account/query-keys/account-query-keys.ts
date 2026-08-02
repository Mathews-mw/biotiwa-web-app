export const usersQueryKeys = {
	all: ['users'] as const,
};

export const addressQueryKeys = {
	all: ['address'] as const,
	userAddresses: (...args: unknown[]) => [...addressQueryKeys.all, ...args] as const,
};
