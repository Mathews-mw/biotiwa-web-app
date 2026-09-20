import { ComponentProps } from 'react';
import { VariantProps, tv } from 'tailwind-variants';

const orderStatus = tv({
	base: 'flex h-min w-min items-center justify-center text-nowrap rounded-sm px-2 py-px',
	variants: {
		status: {
			PENDING_PAYMENT: 'bg-orange-200 text-orange-700',
			PROCESSING: 'bg-sky-200 text-sky-700',
			PAID: 'bg-emerald-200 text-emerald-700',
			PAYMENT_FAILED: 'bg-red-200 text-red-700',
			CANCELED: 'bg-red-200 text-red-700',
			EXPIRED: 'bg-amber-200 text-amber-700',
			REFUNDED: 'bg-gray-200 text-gray-700',
			SHIPPED: 'bg-gray-200 text-gray-700',
			DELIVERED: 'bg-gray-200 text-gray-700',
		},
	},

	defaultVariants: {
		status: 'PENDING_PAYMENT',
	},
});

interface IProps {
	text: string;
}

export type StatusProps = ComponentProps<'div'> & VariantProps<typeof orderStatus> & IProps;

export function OrderStatusBadge({ status, className, text, ...props }: StatusProps) {
	return (
		<div className={orderStatus({ status, className })} {...props}>
			<span className="text-sm font-bold">{text}</span>
		</div>
	);
}
