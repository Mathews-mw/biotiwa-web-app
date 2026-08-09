import { clientApi } from '@/lib/http/client-api';

export async function clearCartRequest(): Promise<void> {
	await clientApi.delete('/cart/clear');
}
