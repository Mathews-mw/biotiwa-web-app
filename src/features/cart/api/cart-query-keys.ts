export const cartQueryKeys = {
	all: ['cart'] as const,

	byUser: (userId: string) => {
		return [...cartQueryKeys.all, 'by-user', userId] as const;
	},
};
