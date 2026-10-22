import { useQuery } from '@tanstack/react-query';

import { affiliateQueryKeys } from '../queries/affiliate-query-keys';
import { getAffiliateDashboardRequest } from '../http-requests/get-affiliate-dashboard.request';

export function useAffiliateDashboardQuery() {
	return useQuery({
		queryKey: affiliateQueryKeys.dashboard(),
		queryFn: getAffiliateDashboardRequest,
		staleTime: 1000 * 60, // 1 minute
	});
}
