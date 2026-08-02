import z from 'zod';

export const registerUserFormSchema = z
	.object({
		name: z.string().min(1, 'O nome é obrigatório'),
		email: z.email('Email inválido'),
		password: z.string().min(8, 'A senha deve conter pelo menos 8 caracteres'),
		confirmPassword: z.string().min(8, 'A confirmação de senha deve conter pelo menos 8 caracteres'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'As senhas não coincidem',
	});

export type IRegisterUserFormData = z.infer<typeof registerUserFormSchema>;
