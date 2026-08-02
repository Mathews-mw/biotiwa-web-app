export interface IActionResponse<T = unknown> {
	success: boolean;
	message: string;
	data: T | null;
	errors: {
		name?: string[] | undefined;
		email?: string[] | undefined;
		password?: string[] | undefined;
		confirmPassword?: string[] | undefined;
	} | null;
}
