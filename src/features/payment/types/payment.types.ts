export type IPaymentProvider = 'STRIPE';
export type IPaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'CANCELED' | 'EXPIRED' | 'REFUNDED';
export type IPaymentType = 'BEING_DEFINED' | 'PIX' | 'CREDIT' | 'DEBIT' | 'PAYMENT_SLIPS_OR_SIMILAR';

export interface IPayment {
	id: string;
	order_id: string;
	provider: IPaymentProvider;
	status: IPaymentStatus;
	amount: number;
	currency: string;
	payment_type: IPaymentType;
	provider_session_id?: string | null;
	provider_payment_intent?: string | null;
	provider_checkout_url?: string | null;
	created_at: Date;
	updated_at?: Date | null;
}
