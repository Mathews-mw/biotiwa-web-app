'use client';

import { useMemo, useState } from 'react';
import { notFound } from 'next/navigation';

import type { ITrackedEvent } from '@/features/tracking/types/tracking';

import { env } from '@/env';
import {
	clearStoredTrackingEvents,
	getStoredSessionId,
	getStoredTrackingEvents,
} from '@/features/tracking/lib/tracking-storage';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EventCard } from '@/features/tracking/components/event-card';

import { RefreshCcw, Trash2 } from 'lucide-react';

export default function FunnelDebugPage() {
	const isEnabled = process.env.NODE_ENV === 'development' || env.NEXT_PUBLIC_ENABLE_DEBUG_FUNNEL;

	const [events, setEvents] = useState<ITrackedEvent[]>(() => {
		return getStoredTrackingEvents();
	});

	const [sessionId, setSessionId] = useState<string | null>(() => {
		return getStoredSessionId();
	});

	const eventCountByType = useMemo(() => {
		return events.reduce<Record<string, number>>((acc, event) => {
			acc[event.eventType] = (acc[event.eventType] ?? 0) + 1;

			return acc;
		}, {});
	}, [events]);

	function handleRefresh() {
		setEvents(getStoredTrackingEvents());
		setSessionId(getStoredSessionId());
	}

	function handleClearEvents() {
		clearStoredTrackingEvents();
		handleRefresh();
	}

	if (!isEnabled) {
		notFound();
	}

	return (
		<main className="min-h-svh bg-[#0d0710] px-6 py-10 text-white lg:px-10">
			<div className="mx-auto max-w-7xl">
				<div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
					<div>
						<p className="text-brand-gold text-xs font-medium tracking-[0.3em] uppercase">Debug interno</p>

						<h1 className="mt-4 text-4xl font-medium tracking-tighter sm:text-5xl">Eventos do funil</h1>

						<p className="mt-4 max-w-2xl text-sm leading-7 text-white/50">
							Esta tela mostra os eventos mockados salvos no navegador. Ela serve para validar a jornada antes de
							conectar backend, GA4 e Microsoft Clarity, ou algum outro serviço de tracking.
						</p>
					</div>

					<div className="flex flex-wrap gap-3">
						<Button
							type="button"
							variant="outline"
							onClick={handleRefresh}
							className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
						>
							<RefreshCcw className="size-4" />
							Atualizar
						</Button>

						<Button
							type="button"
							variant="outline"
							onClick={handleClearEvents}
							className="rounded-full border-red-400/30 bg-red-500/10 text-red-100 hover:bg-red-500/20 hover:text-red-50"
						>
							<Trash2 className="size-4" />
							Limpar eventos
						</Button>
					</div>
				</div>

				<div className="mt-10 grid gap-5 lg:grid-cols-3">
					<MetricCard label="Session ID" value={sessionId ?? 'Não criado'} />
					<MetricCard label="Eventos registrados" value={String(events.length)} />
					<MetricCard label="Tipos de evento" value={String(Object.keys(eventCountByType).length)} />
				</div>

				<Card className="mt-8 border-white/10 bg-white/4 p-6 text-white">
					<h2 className="text-xl font-medium">Resumo por tipo</h2>

					{Object.keys(eventCountByType).length === 0 ? (
						<p className="mt-4 text-sm text-white/45">Nenhum evento registrado ainda.</p>
					) : (
						<div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
							{Object.entries(eventCountByType).map(([eventType, count]) => (
								<div key={eventType} className="rounded-2xl border border-white/10 bg-black/15 p-4">
									<p className="text-brand-gold font-mono text-xs">{eventType}</p>

									<p className="mt-2 text-2xl font-semibold">{count}</p>
								</div>
							))}
						</div>
					)}
				</Card>

				<div className="mt-8 space-y-4">
					{events.length === 0 ? (
						<Card className="border-white/10 bg-white/4 p-8 text-center text-white">
							<p className="text-white/50">
								Interaja com a landing page, escolha uma oferta ou avance para o checkout para gerar eventos.
							</p>
						</Card>
					) : (
						events
							.slice()
							.reverse()
							.map((event, index) => (
								<EventCard key={`${event.eventType}-${event.occurredAt}-${index}`} event={event} />
							))
					)}
				</div>
			</div>
		</main>
	);
}

type MetricCardProps = {
	label: string;
	value: string;
};

function MetricCard({ label, value }: MetricCardProps) {
	return (
		<Card className="border-white/10 bg-white/4 p-6 text-white">
			<p className="text-sm text-white/45">{label}</p>

			<p className="text-brand-gold mt-3 font-mono text-lg break-all">{value}</p>
		</Card>
	);
}
