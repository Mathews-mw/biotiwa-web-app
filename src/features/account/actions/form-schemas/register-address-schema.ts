import z from 'zod';

export const registerAddressFormSchema = z.object({
	market: z.string().min(1, { message: 'Por favor, preencha o campo.' }),
	label: z.string().optional(),
	recipient: z.string().optional(),
	postalCode: z.string().min(1, { message: 'Por favor, preencha o campo.' }),
	addressLine1: z.string().min(1, { message: 'Por favor, preencha o campo.' }),
	number: z.string().min(1, { message: 'Por favor, preencha o campo.' }),
	addressLine2: z.string().optional(),
	district: z.string().min(1, { message: 'Por favor, preencha o campo.' }),
	city: z.string().min(1, { message: 'Por favor, preencha o campo.' }),
	state: z.string().min(1, { message: 'Por favor, preencha o campo.' }),
	country: z.string().min(1, { message: 'Por favor, preencha o campo.' }),
	isDefault: z.coerce.boolean().optional(),
});

export type IRegisterAddressFormInput = z.input<typeof registerAddressFormSchema>;

export type IRegisterAddressFormData = z.output<typeof registerAddressFormSchema>;
