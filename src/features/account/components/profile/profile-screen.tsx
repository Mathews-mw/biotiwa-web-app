'use client';

import Link from 'next/link';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { useGetUserAddresses } from '../../hooks/use-address-queries';
import { useSessionQuery } from '@/features/auth/hooks/use-auth-queries';

import { Card } from '@/components/ui/card';
import { AddressCard } from './address-card';
import { Button } from '@/components/ui/button';
import { UserProfileForm } from './user-profile-form';
import { AddNewAddressDialog } from './add-new-address-dialog';
import { UserProfileFormSkeleton } from './user-profile-form-skeleton';

import { ArrowLeft } from 'lucide-react';
import { IconFileTextFilled, IconMapPins, IconUserFilled } from '@tabler/icons-react';

export function ProfileScreen() {
	const [parent] = useAutoAnimate();
	const sessionQuery = useSessionQuery();
	const user = sessionQuery.data?.session?.user;

	const { data: address } = useGetUserAddresses({ userId: user?.id });

	return (
		<section className="my-8 space-y-8">
			<div className="flex w-full items-center justify-between">
				<div className="flex items-center gap-2">
					<IconUserFilled className="text-brand-acai size-9" strokeWidth={0} />
					<h1 className="text-jaguar text-3xl font-medium tracking-tight">Minha conta</h1>
				</div>

				<Button variant="link" className="text-brand-acai hover:text-brand-violet">
					<ArrowLeft />
					<Link href="/">Voltar para o início</Link>
				</Button>
			</div>

			<p className="text-muted-foreground mt-4">
				Esta área será expandida depois com informações, endereços e preferências do usuário.
			</p>

			<div className="flex w-full flex-wrap gap-8">
				<div className="h-min grow">
					<Card className="p-6">
						<div className="flex items-center gap-2">
							<IconFileTextFilled className="text-brand-acai" />
							<h2 className="text-lg font-semibold">Dados de cadastro</h2>
						</div>

						{user ? <UserProfileForm profile={user.profile} user={user} /> : <UserProfileFormSkeleton />}
					</Card>
				</div>

				<div className="h-min grow">
					<Card className="p-6">
						<div className="flex w-full items-center justify-between">
							<div className="flex items-center gap-2">
								<IconMapPins className="text-brand-acai" />
								<h2 className="text-lg font-semibold">Endereços cadastrados</h2>
							</div>

							{user && <AddNewAddressDialog userId={user.id} />}
						</div>

						{user && address && (
							<div ref={parent} className="space-y-2">
								{address.map((address) => {
									return <AddressCard key={address.id} address={address} />;
								})}
							</div>
						)}
					</Card>
				</div>
			</div>
		</section>
	);
}
