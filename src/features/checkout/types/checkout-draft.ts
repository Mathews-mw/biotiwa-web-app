import { ICheckoutFormData } from '../schemas/checkout-schema';

export type ICheckoutDraftValues = Partial<Omit<ICheckoutFormData, 'acceptPrivacy'>>;

export interface ICheckoutDraft {
	userId: string;
	values: ICheckoutDraftValues;
	updatedAt: string;
}
