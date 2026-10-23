import z from 'zod';

export const approvalAffiliateFormSchema = z.object({
	decision: z.enum(['APPROVE', 'REJECT'], { error: 'Por favor, selecione uma das opções' }),
});

export type IApprovalAffiliateFormInput = z.input<typeof approvalAffiliateFormSchema>;

export type IApprovalAffiliateFormData = z.output<typeof approvalAffiliateFormSchema>;
