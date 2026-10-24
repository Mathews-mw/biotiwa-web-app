import z from 'zod';

export const createOwnAffiliatePromotionCodeFormSchema = z.object({
	marketCode: z.enum(['BR', 'US']),
	code: z
		.string()
		.trim()
		.min(4, 'Use pelo menos 4 caracteres.')
		.max(24, 'Use no máximo 24 caracteres.')
		.regex(/^[a-zA-Z0-9-]+$/, 'Use apenas letras, números e hífen.'),
	expiresInDays: z.number().int().positive(),
	maxUsesPerCustomer: z.number().int().positive(),
});

export type ICreateOwnAffiliatePromotionCodeFormInput = z.input<typeof createOwnAffiliatePromotionCodeFormSchema>;
export type ICreateOwnAffiliatePromotionCodeFormData = z.output<typeof createOwnAffiliatePromotionCodeFormSchema>;
