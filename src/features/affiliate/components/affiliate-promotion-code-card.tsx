'use client';

import type { IAffiliateStatus } from '../types/affiliate.types';
import type { IPromotionCode } from '@/features/promotion/types/promotion.types';

import { formatBasisPoints } from '@/features/promotion/helpers/format-basis';
import { isAffiliatePromotionCodeAvailable } from '../helpers/is-affiliate-promotion-code-available';

import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/copy-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface IProps {
	promotion: IPromotionCode;
	commissionRate: number;
	affiliateStatus: IAffiliateStatus;
}

export function AffiliatePromotionCodeCard({ promotion, affiliateStatus, commissionRate }: IProps) {
	const promotionAvailable = isAffiliatePromotionCodeAvailable({
		status: promotion.status,
		expiresAt: promotion.expires_at,
	});

	const canShare = affiliateStatus === 'ACTIVE' && promotionAvailable;

	const referralUrl =
		typeof window !== 'undefined' ? `${window.location.origin}/?ref=${encodeURIComponent(promotion.code)}` : '';

	let statusLabel = 'Inativo';

	if (promotion.status === 'ACTIVE' && promotion.expires_at && new Date(promotion.expires_at) <= new Date()) {
		statusLabel = 'Expirado';
	} else if (promotion.status === 'ACTIVE') {
		statusLabel = 'Ativo';
	}

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between gap-4">
					<CardTitle>{promotion.code}</CardTitle>

					<Badge variant={promotionAvailable ? 'default' : 'secondary'}>{statusLabel}</Badge>
				</div>
			</CardHeader>

			<CardContent className="space-y-5">
				<div className="grid gap-4 sm:grid-cols-2">
					<div>
						<p className="text-muted-foreground text-sm">Desconto</p>

						<p className="font-medium">
							{promotion.discount_type === 'PERCENTAGE'
								? formatBasisPoints(promotion.discount_value)
								: `${promotion.discount_value}`}
						</p>
					</div>

					<div>
						<p className="text-muted-foreground text-sm">Sua comissão</p>

						<p className="font-medium">{formatBasisPoints(commissionRate)}</p>
					</div>
				</div>

				<div className="grid gap-4 text-sm sm:grid-cols-2">
					<div>
						<p className="text-muted-foreground">Validade</p>

						<p>
							{promotion.expires_at
								? new Intl.DateTimeFormat('pt-BR').format(new Date(promotion.expires_at))
								: 'Sem expiração'}
						</p>
					</div>

					<div>
						<p className="text-muted-foreground">Usos por cliente</p>

						<p>{promotion.max_uses_per_customer ?? 'Sem limite'}</p>
					</div>
				</div>

				<div className="flex flex-wrap gap-2">
					<CopyButton value={promotion.code} label="Copiar código" />

					<CopyButton value={referralUrl} label="Copiar link" disabled={!canShare} />
				</div>

				{!canShare && (
					<p className="text-muted-foreground text-xs">
						Este código não está disponível para compartilhamento no momento.
					</p>
				)}
			</CardContent>
		</Card>
	);
}
