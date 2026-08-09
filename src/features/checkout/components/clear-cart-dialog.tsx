'use client';

import { toast } from 'sonner';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useClearCartMutation } from '@/features/cart/hooks/use-cart-queries';

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
} from '@/components/ui/dialog';

import { IconLoader2 } from '@tabler/icons-react';
import { IconShoppingCartX } from '@tabler/icons-react';

export function ClearCartDialog() {
	const [isOpen, setIsOpen] = useState(false);

	const router = useRouter();
	const { isPending, mutateAsync: clearCart } = useClearCartMutation();

	async function handleClearCart() {
		try {
			await clearCart();

			setIsOpen(false);
			router.replace('/');
		} catch {
			toast.error('Não foi possível esvaziar o carrinho. Por favor, tente novamente');
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button
					type="button"
					variant="outline"
					className="bg-destructive/10 hover:bg-destructive/15 border-white/15 text-rose-400 hover:text-rose-500"
				>
					<IconShoppingCartX />
					Esvaziar carrinho
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-sm">
				<DialogHeader>
					<DialogTitle>Esvaziar Carrinho</DialogTitle>
					<DialogDescription>Você deseja realmente remover todos os itens do seu carrinho?</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline" disabled={isPending}>
							Voltar
						</Button>
					</DialogClose>

					<Button variant="destructive" disabled={isPending} onClick={handleClearCart}>
						{isPending && <IconLoader2 className="animate-spin" />}
						{isPending ? 'Esvaziando...' : 'Esvaziar carrinho'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
