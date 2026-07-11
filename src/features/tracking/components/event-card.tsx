import type { ITrackedEvent } from '../types/tracking';

import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type EventCardProps = {
	event: ITrackedEvent;
};

export function EventCard({ event }: EventCardProps) {
	const formattedDate = new Intl.DateTimeFormat('pt-BR', {
		dateStyle: 'short',
		timeStyle: 'medium',
	}).format(new Date(event.occurredAt));

	return (
		<Card className="border-white/10 bg-white/4 p-5 text-white">
			<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
				<div>
					<p className="text-brand-gold font-mono text-sm">{event.eventType}</p>

					<p className="mt-2 text-sm text-white/45">{formattedDate}</p>
				</div>

				<div className="flex gap-2">
					{event.market ? (
						<span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
							{event.market}
						</span>
					) : null}

					<span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
						session
					</span>
				</div>
			</div>

			<Separator className="my-5 bg-white/10" />

			<div>
				<p className="mb-2 text-xs tracking-[0.2em] text-white/35 uppercase">Payload</p>

				<pre className="max-h-80 overflow-auto rounded-2xl bg-black/30 p-4 text-xs leading-6 text-white/65">
					{JSON.stringify(event.payload ?? {}, null, 2)}
				</pre>
			</div>
		</Card>
	);
}
