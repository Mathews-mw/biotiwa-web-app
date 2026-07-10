import { z } from 'zod';

export const checkoutSchema = z
	.object({
		market: z.enum(['BR', 'US']),
		fullName: z.string().min(3, 'Informe seu nome completo.').max(120, 'Nome muito longo.'),
		email: z.string().min(1, 'Informe seu e-mail.').email('Informe um e-mail válido.'),
		age: z.coerce
			.number({
				message: 'Informe sua idade.',
			})
			.int('Informe uma idade válida.')
			.min(18, 'É necessário ter pelo menos 18 anos.')
			.max(120, 'Informe uma idade válida.'),
		sportPractice: z.string().min(2, 'Informe se pratica algum esporte.').max(80, 'Texto muito longo.'),
		postalCode: z.string().min(5, 'Informe o CEP/ZIP code.').max(12, 'CEP/ZIP code inválido.'),
		addressLine1: z.string().min(3, 'Informe o endereço.').max(160, 'Endereço muito longo.'),
		number: z.string().max(20, 'Número muito longo.').optional(),
		addressLine2: z.string().max(120, 'Complemento muito longo.').optional(),
		district: z.string().max(80, 'Bairro muito longo.').optional(),
		city: z.string().min(2, 'Informe a cidade.').max(80, 'Cidade muito longa.'),
		state: z.string().min(2, 'Informe o estado.').max(40, 'Estado muito longo.'),
		acceptPrivacy: z.boolean().refine((value) => value === true, {
			message: 'Você precisa aceitar os termos e a política de privacidade.',
		}),
	})
	.superRefine((data, ctx) => {
		if (data.market === 'BR' && !data.number?.trim()) {
			ctx.addIssue({
				code: 'custom',
				path: ['number'],
				message: 'Informe o número.',
			});
		}

		if (data.market === 'BR' && !data.district?.trim()) {
			ctx.addIssue({
				code: 'custom',
				path: ['district'],
				message: 'Informe o bairro.',
			});
		}
	});

// O tipo dos dados conforme entram no formulário (age será unknown)
export type ICheckoutFormInput = z.input<typeof checkoutSchema>;

// O tipo dos dados após passarem pela validação/coerção (age será number)
export type ICheckoutFormData = z.infer<typeof checkoutSchema>; // ou z.output
