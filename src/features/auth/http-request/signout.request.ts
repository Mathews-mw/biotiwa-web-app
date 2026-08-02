import { clientApi } from '@/lib/http/client-api';

export async function signOutRequest(): Promise<void> {
	await clientApi.patch('/sessions/signout');
}
