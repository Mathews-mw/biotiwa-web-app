import z from 'zod';

export const signInFormSchema = z.object({
	email: z.email('Email inválido'),
	password: z.string().min(1, 'Por favor, informe a senha'),
});

export type ISignInFormData = z.infer<typeof signInFormSchema>;
