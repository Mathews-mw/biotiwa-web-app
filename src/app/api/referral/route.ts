import { z } from 'zod';
import { cookies } from 'next/headers';

const REFERRAL_MAX_AGE = 60 * 60 * 24 * 30;
const REFERRAL_COOKIE_NAME = 'biotiwa_referral';

const referralSchema = z.object({
	code: z
		.string()
		.trim()
		.min(4)
		.max(24)
		.regex(/^[a-zA-Z0-9-]+$/),
});

export async function GET() {
	const cookieStore = await cookies();

	const referral = cookieStore.get(REFERRAL_COOKIE_NAME);

	return Response.json({
		code: referral?.value ?? null,
	});
}

export async function POST(request: Request) {
	const body = await request.json();

	const result = referralSchema.safeParse(body);

	if (!result.success) {
		return Response.json(
			{
				error: 'Invalid referral code',
			},
			{
				status: 400,
			}
		);
	}

	const code = result.data.code.trim().toUpperCase();

	const cookieStore = await cookies();

	cookieStore.set(REFERRAL_COOKIE_NAME, code, {
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		path: '/',
		maxAge: REFERRAL_MAX_AGE,
	});

	return Response.json({
		code,
	});
}

export async function DELETE() {
	const cookieStore = await cookies();

	cookieStore.delete(REFERRAL_COOKIE_NAME);

	return new Response(null, {
		status: 204,
	});
}
