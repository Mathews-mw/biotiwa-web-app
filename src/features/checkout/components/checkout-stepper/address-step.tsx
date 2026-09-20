import { useCallback, useEffect, useMemo } from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';

import type { IAddress } from '@/features/account/types/address.types';
import type { ICheckoutFormInput } from '../../schemas/checkout-schema';
import type { IMarketCode } from '@/features/commerce/types/commerce-entity-types';

import { useGetUserAddresses } from '@/features/account/hooks/use-address-queries';

import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Field, FieldContent, FieldLabel, FieldTitle } from '@/components/ui/field';
import { AddNewAddressDialog } from '@/features/account/components/profile/add-new-address-dialog';

import { MapPinned } from 'lucide-react';

type AddressStepProps = {
	userId?: string;
	form: UseFormReturn<ICheckoutFormInput>;
	marketCode: IMarketCode;
	// quote: ICheckoutQuote;
};

export function AddressStep({ userId, form, marketCode }: AddressStepProps) {
	const marketLAbel = marketCode === 'BR' ? 'Brasil' : 'United States';

	const { data: userAddressesData, isLoading: isLoadingAddresses } = useGetUserAddresses({ userId });

	const selectedAddressId = useWatch({
		control: form.control,
		name: 'selectedAddressId',
	});

	// Filtrar os endereços do usuário com base no mercado selecionado
	const availableAddresses = useMemo(() => {
		return (
			userAddressesData?.filter((address) => {
				return address.market === marketCode;
			}) ?? []
		);
	}, [userAddressesData, marketCode]);

	const fillFormWithAddress = useCallback(
		(address: IAddress) => {
			form.setValue('selectedAddressId', address.id, {
				shouldDirty: true,
				shouldValidate: true,
			});
			form.setValue('postalCode', address.postal_code, {
				shouldDirty: true,
				shouldValidate: true,
			});
			form.setValue('addressLine1', address.address_line_1, {
				shouldDirty: true,
				shouldValidate: true,
			});
			form.setValue('number', address.number ?? '', {
				shouldDirty: true,
				shouldValidate: true,
			});
			form.setValue('addressLine2', address.address_line_2 ?? '', {
				shouldDirty: true,
				shouldValidate: true,
			});
			form.setValue('district', address.district ?? '', {
				shouldDirty: true,
				shouldValidate: true,
			});
			form.setValue('city', address.city, {
				shouldDirty: true,
				shouldValidate: true,
			});
			form.setValue('state', address.state, {
				shouldDirty: true,
				shouldValidate: true,
			});
		},
		[form]
	);

	const handleSelectAddressChange = useCallback(
		(addressId: string) => {
			const selectedAddress = availableAddresses.find((address) => {
				return address.id === addressId;
			});

			if (!selectedAddress) {
				return;
			}

			fillFormWithAddress(selectedAddress);
			form.setValue('shippingRateId', '', { shouldDirty: true, shouldValidate: true });
		},
		[availableAddresses, fillFormWithAddress]
	);

	useEffect(() => {
		if (selectedAddressId) {
			return;
		}

		const defaultAddress = availableAddresses.find((address) => address.is_default) ?? availableAddresses[0];

		if (!defaultAddress) {
			return;
		}

		fillFormWithAddress(defaultAddress);
	}, [availableAddresses, selectedAddressId, fillFormWithAddress]);

	return (
		<div className="space-y-4">
			<Card className="border-white/10 bg-white/4 p-6 text-white">
				<div className="flex items-start gap-4">
					<div className="bg-brand-gold/15 text-brand-gold flex size-10 shrink-0 items-center justify-center rounded-full">
						<MapPinned className="size-5" />
					</div>

					<div className="flex w-full justify-between">
						<div>
							<h2 className="text-xl font-medium">Endereço de entrega</h2>

							<p className="mt-2 text-sm leading-6 text-white/45">
								Mercado selecionado: <span className="font-medium text-white">{marketLAbel}</span>
							</p>

							<p className="text-sm">
								Por favor, selecione um endereço de entrega ou adicione um novo endereço para prosseguir com a
								finalização da compra.
							</p>
						</div>

						{userId && <AddNewAddressDialog userId={userId} isMainTheme />}
					</div>
				</div>

				{isLoadingAddresses && <p className="mt-6 text-sm text-white/50">Carregando seus endereços...</p>}

				{!isLoadingAddresses && availableAddresses.length === 0 && (
					<div className="mt-6 rounded-2xl border border-dashed border-white/15 bg-white/5 p-5">
						<p className="text-sm font-medium text-white">Nenhum endereço cadastrado para este mercado.</p>

						<p className="mt-2 text-sm text-white/50">Adicione um endereço de entrega para continuar com a compra.</p>
					</div>
				)}

				{availableAddresses.length > 0 && (
					<RadioGroup value={selectedAddressId} onValueChange={handleSelectAddressChange}>
						{availableAddresses.map((address) => {
							return (
								<FieldLabel
									key={address.id}
									htmlFor={address.id}
									className="hover:bg-primary/10 border border-zinc-500/30"
								>
									<Field orientation="horizontal">
										<FieldContent>
											<FieldTitle>{address.address_line_1}</FieldTitle>

											<div className="space-y-1 text-sm">
												{address.number && <p>Número: {address.number}</p>}

												{address.address_line_2 && <p>Complemento: {address.address_line_2}</p>}

												<p>CEP: {address.postal_code}</p>

												<p>
													{address.city}, {address.state}
												</p>
											</div>
										</FieldContent>

										{address.is_default && <span className="text-primary text-sm font-bold">PRINCIPAL</span>}

										<RadioGroupItem value={address.id} id={address.id} />
									</Field>
								</FieldLabel>
							);
						})}
					</RadioGroup>
				)}
			</Card>
		</div>
	);
}
