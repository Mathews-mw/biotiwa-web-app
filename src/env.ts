import { z } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
	server: {
		APP_URL: z.string(),
	},

	client: {
		NEXT_PUBLIC_API_BASE_URL: z.url(),
		NEXT_PUBLIC_APP_BASE_URL: z.url(),
		NEXT_PUBLIC_ENABLE_DEBUG_FUNNEL: z.coerce.boolean().default(false),
	},

	runtimeEnv: {
		APP_URL: process.env.APP_URL,
		NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
		NEXT_PUBLIC_APP_BASE_URL: process.env.NEXT_PUBLIC_APP_BASE_URL,
		NEXT_PUBLIC_ENABLE_DEBUG_FUNNEL: process.env.NEXT_PUBLIC_ENABLE_DEBUG_FUNNEL,
	},
});
