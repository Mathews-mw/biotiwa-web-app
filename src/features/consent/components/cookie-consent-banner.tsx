'use client';

import { useState } from 'react';
import { BarChart3, ShieldCheck } from 'lucide-react';

import { useConsent } from '../context/consent-provider';

import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

export function CookieConsentBanner() {
	const { hasAnswered, acceptAll, rejectOptional, savePreferences } = useConsent();

	const [showSettings, setShowSettings] = useState(false);
	const [analytics, setAnalytics] = useState(true);
	const [marketing, setMarketing] = useState(false);

	if (hasAnswered) {
		return null;
	}

	return (
		<div className="fixed inset-x-0 bottom-0 z-80 px-4 pb-4 sm:px-6 sm:pb-6">
			<Card className="mx-auto max-w-5xl border-white/10 bg-[#100813]/95 p-5 text-white shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-6">
				<div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
					<div>
						<div className="flex items-center gap-3">
							<div className="bg-brand-gold/15 text-brand-gold flex size-10 items-center justify-center rounded-full">
								<ShieldCheck className="size-5" />
							</div>

							<div>
								<p className="text-sm font-medium text-white">Preferências de privacidade</p>

								<p className="mt-1 text-xs text-white/45">Cookies necessários ficam sempre ativos.</p>
							</div>
						</div>

						<p className="mt-5 max-w-3xl text-sm leading-6 text-white/55">
							Usamos tecnologias essenciais para funcionamento da página e, com sua permissão, analytics para entender a
							jornada de compra, melhorar a experiência e medir o desempenho da nossa interface.
						</p>

						{showSettings ? (
							<div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
								<div className="flex items-start gap-3">
									<Checkbox checked disabled className="mt-1" />

									<div>
										<Label className="text-sm text-white">Necessários</Label>

										<p className="mt-1 text-xs leading-5 text-white/45">
											Mantêm recursos básicos funcionando, como preferências e segurança da navegação.
										</p>
									</div>
								</div>

								<Separator className="my-4 bg-white/10" />

								<div className="flex items-start gap-3">
									<Checkbox
										id="analytics-consent"
										checked={analytics}
										onCheckedChange={(checked) => {
											setAnalytics(checked === true);
										}}
										className="data-[state=checked]:border-brand-gold data-[state=checked]:bg-brand-gold mt-1 border-white/30"
									/>

									<div>
										<Label htmlFor="analytics-consent" className="cursor-pointer text-sm text-white">
											Analytics
										</Label>

										<p className="mt-1 text-xs leading-5 text-white/45">
											Ajuda a medir visualizações, cliques, início de checkout e conversão do funil.
										</p>
									</div>
								</div>

								<Separator className="my-4 bg-white/10" />

								<div className="flex items-start gap-3">
									<Checkbox
										id="marketing-consent"
										checked={marketing}
										onCheckedChange={(checked) => {
											setMarketing(checked === true);
										}}
										className="data-[state=checked]:border-brand-gold data-[state=checked]:bg-brand-gold mt-1 border-white/30"
									/>

									<div>
										<Label htmlFor="marketing-consent" className="cursor-pointer text-sm text-white">
											Marketing
										</Label>

										<p className="mt-1 text-xs leading-5 text-white/45">
											Reservado para campanhas, anúncios e personalização futura. Pode ficar desativado neste pré-MVP.
										</p>
									</div>
								</div>
							</div>
						) : null}
					</div>

					<div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
						{showSettings ? (
							<Button
								type="button"
								onClick={() => {
									savePreferences({
										analytics,
										marketing,
									});
								}}
								className="rounded-full bg-[#f5efe4] text-[#16091f] hover:bg-white"
							>
								Salvar preferências
							</Button>
						) : (
							<Button
								type="button"
								onClick={acceptAll}
								className="rounded-full bg-[#f5efe4] text-[#16091f] hover:bg-white"
							>
								Aceitar analytics
							</Button>
						)}

						<Button
							type="button"
							variant="outline"
							onClick={rejectOptional}
							className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
						>
							Recusar opcionais
						</Button>

						<Button
							type="button"
							variant="ghost"
							onClick={() => setShowSettings((current) => !current)}
							className="rounded-full text-white/70 hover:bg-white/10 hover:text-white"
						>
							<BarChart3 className="size-4" />
							{showSettings ? 'Ocultar opções' : 'Configurar'}
						</Button>
					</div>
				</div>
			</Card>
		</div>
	);
}
