import z from 'zod';

export const registerAffiliateFormSchema = z.object({
	type: z.enum(['PROMOTER', 'RESELLER'], { error: 'Por favor, selecione uma das opções' }),
	acceptTerms: z.boolean().refine((value) => value === true, {
		message: 'Você precisa aceitar os termos de afiliação.',
	}),
});

export type IRegisterAffiliateFormInput = z.input<typeof registerAffiliateFormSchema>;

export type IRegisterAffiliateFormData = z.output<typeof registerAffiliateFormSchema>;
