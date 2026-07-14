import { z } from 'zod';

export const registerSchema = z
	.object({
		name: z.string().min(3, 'Informe seu nome completo.').max(120, 'Nome muito longo.'),
		email: z.email('Informe um e-mail válido.').min(1, 'Informe seu e-mail.'),
		password: z.string().min(8, 'A senha precisa ter pelo menos 8 caracteres.'),
		confirmPassword: z.string().min(1, 'Confirme sua senha.'),
		acceptPrivacy: z.boolean().refine((value) => value === true, {
			message: 'Você precisa aceitar os termos e a política de privacidade.',
		}),
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.confirmPassword) {
			ctx.addIssue({
				code: 'custom',
				path: ['confirmPassword'],
				message: 'As senhas não conferem.',
			});
		}
	});

export type IRegisterFormInput = z.input<typeof registerSchema>;

export type IRegisterFormData = z.infer<typeof registerSchema>;
