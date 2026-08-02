'use client';

import { toast } from 'sonner';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addressQueryKeys } from '../../query-keys/account-query-keys';
import { deleteAddressAction } from '../../actions/delete-address.actions';

import { Button } from '../../../../components/ui/button';
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

export function DeleteAddressDialog({ userId, addressId }: IProps) {
	const [isOpen, setIsOpen] = useState(false);

	const useQuery = useQueryClient();

	const { mutateAsync: deleteAddressActionFn, isPending } = useMutation({
		mutationFn: deleteAddressAction,
		onSuccess: async () => {
			await useQuery.invalidateQueries({ queryKey: addressQueryKeys.userAddresses(userId) });
		},
	});

	async function handleDeleteAddress() {
		const result = await deleteAddressActionFn(addressId);

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
					Excluir
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Excluir endereço</DialogTitle>

					<DialogDescription className="text-muted-foreground text-sm">
						Deseja realmente excluir este endereço?
					</DialogDescription>
				</DialogHeader>

				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline" disabled={isPending} onClick={() => setIsOpen(!isOpen)}>
							Não
						</Button>
					</DialogClose>

					<Button variant="destructive" onClick={() => handleDeleteAddress()} disabled={isPending}>
						Sim
						{isPending && <Loader2 className="animate-spin" />}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
