import { NextResponse, type NextRequest } from 'next/server';

import { env } from '@/env';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type QueryParamValue = string | number | boolean | null | undefined;
type QueryParams = Record<string, QueryParamValue | QueryParamValue[]>;

interface ProxyApiRequestParams {
	request: NextRequest;
	apiPath: string;
	method?: HttpMethod;
	body?: unknown;
	searchParams?: QueryParams;
	forwardSearchParams?: boolean;
}

interface BuildTargetUrlParams {
	apiPath: string;
	request: NextRequest;
	searchParams?: QueryParams;
	forwardSearchParams: boolean;
}

export async function proxyApiRequest({
	request,
	apiPath,
	method = 'GET',
	body,
	searchParams,
	forwardSearchParams = true,
}: ProxyApiRequestParams) {
	const cookieHeader = request.headers.get('cookie');

	const targetUrl = buildTargetUrl({
		apiPath,
		request,
		searchParams,
		forwardSearchParams,
	});

	const apiResponse = await fetch(targetUrl.toString(), {
		method,
		headers: {
			'Content-Type': 'application/json',
			...(cookieHeader ? { cookie: cookieHeader } : {}),
		},
		body: body !== undefined ? JSON.stringify(body) : undefined,
		cache: 'no-store',
	});

	const contentType = apiResponse.headers.get('content-type');

	const responseBody =
		apiResponse.status === 204
			? null
			: contentType?.includes('application/json')
				? await apiResponse.json()
				: await apiResponse.text();

	const nextResponse =
		responseBody === null
			? new NextResponse(null, { status: apiResponse.status })
			: NextResponse.json(responseBody, { status: apiResponse.status });

	copySetCookieHeaders(apiResponse, nextResponse);

	return nextResponse;
}

function buildTargetUrl({ apiPath, request, searchParams, forwardSearchParams }: BuildTargetUrlParams) {
	const normalizedApiPath = apiPath.startsWith('/') ? apiPath : `/${apiPath}`;

	const url = new URL(`${env.APP_URL}/api${normalizedApiPath}`);

	if (forwardSearchParams) {
		request.nextUrl.searchParams.forEach((value, key) => {
			url.searchParams.append(key, value);
		});
	}

	if (searchParams) {
		appendSearchParams(url, searchParams);
	}

	return url;
}

function appendSearchParams(url: URL, searchParams: QueryParams) {
	Object.entries(searchParams).forEach(([key, value]) => {
		if (value === undefined || value === null) {
			return;
		}

		if (Array.isArray(value)) {
			value.forEach((item) => {
				if (item !== undefined && item !== null) {
					url.searchParams.append(key, String(item));
				}
			});

			return;
		}

		url.searchParams.set(key, String(value));
	});
}

function copySetCookieHeaders(apiResponse: Response, nextResponse: NextResponse) {
	const headers = apiResponse.headers as Headers & {
		getSetCookie?: () => string[];
	};

	const setCookies =
		typeof headers.getSetCookie === 'function' ? headers.getSetCookie() : getSetCookieFallback(apiResponse.headers);

	for (const cookie of setCookies) {
		nextResponse.headers.append('set-cookie', cookie);
	}
}

function getSetCookieFallback(headers: Headers) {
	const setCookie = headers.get('set-cookie');

	if (!setCookie) {
		return [];
	}

	return [setCookie];
}
