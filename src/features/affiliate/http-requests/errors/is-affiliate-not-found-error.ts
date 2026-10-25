import errorCatalog from '@/core/constants/error-catalog';
import { ApiExceptionsError } from '@/lib/http/api-exceptions-error';

export function isAffiliateNotFoundError(error: unknown): boolean {
	if (error instanceof ApiExceptionsError && error.code === errorCatalog[404].AFFILIATE_NOT_FOUND) {
		return true;
	}

	return false;
}
