'use client';

import { getCurrentSessionRequest } from '@/features/auth/http-request/get-current-session.request';
import { Button } from '../ui/button';
import { getUserProfileAction } from './get-user-profile.actions';

export function GetUserProfile() {
	async function handleGetServerProfile() {
		console.log('try to get user profile infos');
		const result = await getUserProfileAction();
		if (!result.success) {
			console.log('Error: ', result.message);
		}
		console.log('User profile: ', result.data);
	}

	async function handleGetClientProfile() {
		console.log('try to get user profile infos');
		const result = await getCurrentSessionRequest();

		console.log('User profile: ', result);
	}

	return (
		<div>
			<Button onClick={() => handleGetServerProfile()}>Get Server Profile info</Button>

			<Button onClick={() => handleGetClientProfile()}>Get Client Profile info</Button>
		</div>
	);
}
