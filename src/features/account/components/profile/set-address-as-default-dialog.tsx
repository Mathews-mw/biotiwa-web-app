'use client';

import { toast } from 'sonner';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addressQueryKeys } from '../../query-keys/account-query-keys';
import { setAddressAsDefaultAction } from '../../actions/set-address-as-default.actions';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../../../../components/ui/dialog';

import { Loader2 } from 'lucide-react';

interface IProps {
	userId: string;
	addressId: string;
}

export function SetAddressAsDefaultDialog({ userId, addressId }: IProps) {
	const [isOpen, setIsOpen] = useState(false);

	const useQuery = useQueryClient();

	const { mutateAsync: setAddressAsDefaultActionFn, isPending } = useMutation({
		mutationFn: setAddressAsDefaultAction,
		onSuccess: async () => {
			await useQuery.invalidateQueries({ queryKey: addressQueryKeys.userAddresses(userId) });
		},
	});

	async function handleSetAddressAsDefault() {
		const result = await setAddressAsDefaultActionFn(addressId);

		if (!result.success) {
			toast.error(result.message);
			return;
		}

		toast.success(result.message);
		setIsOpen(false);
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button size="xs" variant="outline" className="text-xs font-semibold">
					Tornar principal
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Tornar esse endereço principal</DialogTitle>

					<DialogDescription className="text-muted-foreground text-sm">
						Deseja marcar esse endereço como sendo o principal para entregas?
					</DialogDescription>
				</DialogHeader>

				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline" disabled={isPending} onClick={() => setIsOpen(!isOpen)}>
							Não
						</Button>
					</DialogClose>

					<Button onClick={() => handleSetAddressAsDefault()} disabled={isPending}>
						Sim
						{isPending && <Loader2 className="animate-spin" />}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
