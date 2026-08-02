import { twMerge } from 'tailwind-merge';

import type { IAddress } from '../../types/address.types';

import { Button } from '@/components/ui/button';
import { DeleteAddressDialog } from './delete-address-dialog';
import { SetAddressAsDefaultDialog } from './set-address-as-default-dialog';

interface IAddressCardProps {
	address: IAddress;
}

export function AddressCard({ address }: IAddressCardProps) {
	return (
		<div
			className={twMerge([
				'rounded border border-l-4 px-4 py-2',
				`${address.is_default ? 'border-primary bg-primary-foreground' : 'bg-secondary'}`,
			])}
		>
			<div className="flex w-full justify-between">
				<div className="w-full grow space-y-2 text-sm">
					<p>{address.address_line_1}</p>
					<p>Número: {address.number}</p>
					{address.address_line_2 && <p>Complemento: {address.address_line_2}</p>}
					<p>CEP: {address.postal_code}</p>
					<p>
						{address.city}, {address.state}
					</p>
				</div>

				{address.is_default && (
					<div>
						<span className="text-primary text-sm font-bold">(PRINCIPAL)</span>
					</div>
				)}
			</div>

			<div className="flex w-full justify-end gap-2">
				<Button size="xs" variant="outline" className="text-xs font-semibold">
					Editar
				</Button>

				<SetAddressAsDefaultDialog userId={address.user_id} addressId={address.id} />
				<DeleteAddressDialog userId={address.user_id} addressId={address.id} />
			</div>
		</div>
	);
}
