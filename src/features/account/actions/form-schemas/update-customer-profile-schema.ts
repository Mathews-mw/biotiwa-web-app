import z from 'zod';
import { cpf } from 'cpf-cnpj-validator';

export const updateCustomerProfileSchema = z.object({
	name: z.string().min(3, { message: 'O nome deve ter no mínimo 3 caracteres' }),
	preferredMarket: z.string().optional(),
	phone: z.string().length(15).optional(),
	birthDate: z
		.string()
		.refine((value) => /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([0-9]{4})$/.test(value), {
			message: 'Por favor, preencha uma data válida',
		})
		.optional(),
	document: z
		.string()
		.refine((value) => cpf.isValid(value), { message: 'Por favor, preencha um CPF válido' })
		.optional(),
	advertisingConsent: z.boolean().optional(),
});

export type IUpdateCustomerProfileFormInput = z.input<typeof updateCustomerProfileSchema>;

export type IUpdateCustomerProfileFormData = z.output<typeof updateCustomerProfileSchema>;
