'use client';

import type { IPromotionCode } from '@/features/promotion/types/promotion.types';

import { formatBasisPoints } from '@/features/promotion/helpers/format-basis';
import { formatPromotionDiscount } from '@/features/promotion/helpers/format-promotion-discount';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface IProps {
	promotion: IPromotionCode;
	commissionRate: number;
}

export function AffiliatePromotionCodeCard({ promotion, commissionRate }: IProps) {
	const referralUrl = `${window.location.origin}/?ref=${encodeURIComponent(promotion.code)}`;

	async function copyCode() {
		await navigator.clipboard.writeText(promotion.code);
	}

	async function copyReferralLink() {
		await navigator.clipboard.writeText(referralUrl);
	}

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle>{promotion.code}</CardTitle>

					<Badge variant={promotion.status === 'ACTIVE' ? 'secondary' : 'outline'}>
						{promotion.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
					</Badge>
				</div>
			</CardHeader>

			<CardContent className="space-y-4">
				<div>
					<p className="text-muted-foreground text-sm">Desconto para o cliente</p>

					<p className="font-medium">
						{formatPromotionDiscount({
							discountType: promotion.discount_type,
							discountValue: promotion.discount_value,
							marketCode: promotion.market_code,
						})}
					</p>
				</div>

				<div>
					<p className="text-muted-foreground text-sm">Sua comissão</p>

					<p className="font-medium">{formatBasisPoints(commissionRate)}</p>
				</div>

				<div className="flex gap-2">
					<Button type="button" variant="outline" onClick={copyCode}>
						Copiar código
					</Button>

					<Button type="button" onClick={copyReferralLink}>
						Copiar link
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
