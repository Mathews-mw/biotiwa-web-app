export interface IActionResponse<T = unknown> {
	success: boolean;
	message: string;
	data: T | null;
	errorCode: string | null;
	fieldErrors: Record<string | number, string[] | undefined> | null;
}
