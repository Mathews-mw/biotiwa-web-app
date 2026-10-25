import { clientApi } from '@/lib/http/client-api';
import type { IAffiliateDashboard } from '../types/affiliate.types';

type IResponse = IAffiliateDashboard;

export async function getAffiliateDashboardRequest(): Promise<IResponse> {
	const response = await clientApi.get('affiliates/me/dashboard').json<IResponse>();

	return response;
}
