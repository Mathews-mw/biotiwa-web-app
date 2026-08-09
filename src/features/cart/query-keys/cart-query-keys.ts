export const cartQueryKeys = {
	all: ['cart'] as const,
	active: () => [...cartQueryKeys.all, 'active'] as const,
};
