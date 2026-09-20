'use client';

import 'dayjs/locale/pt-br';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';

import dayjs from 'dayjs';
import { ReactNode } from 'react';

dayjs.locale('pt-br');
dayjs.extend(utc);
dayjs.extend(relativeTime);

export function DateProvider({ children }: { children: ReactNode }) {
	return <>{children}</>;
}
