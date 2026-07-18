import type { IMarket, IOffer, IOrderBump, IProduct } from '@/features/commerce/types/commerce';

export const markets: IMarket[] = [
	{
		code: 'BR',
		label: 'Brasil',
		locale: 'pt-BR',
		currency: 'BRL',
		shippingAmount: 4000,
		taxRate: 0.18,
	},
	{
		code: 'US',
		label: 'United States',
		locale: 'en-US',
		currency: 'USD',
		shippingAmount: 500,
		taxRate: 0,
	},
];

export const product: IProduct = {
	id: 'acaipulse',
	sku: 'ACAIPULSE-60',
	slug: 'acaipulse',
	name: 'Açaípulse®',
	shortDescription: 'Suplemento natural em cápsulas, apresentado em embalagem com 60 unidades.',
	imageUrl: '/images/product/bottle-no-bg.png',
	// imageUrl:
	// 	'https://images.unsplash.com/photo-1664786908068-e435ba6edb89?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	pillsPerPack: 60,
};

export const offers: IOffer[] = [
	{
		id: 'br-1-month',
		market: 'BR',
		name: 'Kit 1 mês',
		description: '1 embalagem com 60 cápsulas.',
		quantity: 1,
		unitAmount: 19900,
		discountPercent: 0,
	},
	{
		id: 'br-3-months',
		market: 'BR',
		name: 'Kit 3 meses',
		description: '3 embalagens com 10% de desconto.',
		quantity: 3,
		unitAmount: 19900,
		discountPercent: 10,
		isHighlighted: true,
	},
	{
		id: 'us-1-month',
		market: 'US',
		name: '1 Month Kit',
		description: '1 bottle with 60 capsules.',
		quantity: 1,
		unitAmount: 3900,
		discountPercent: 0,
	},
	{
		id: 'us-3-months',
		market: 'US',
		name: '3 Month Kit',
		description: '3 bottles with 10% off.',
		quantity: 3,
		unitAmount: 3900,
		discountPercent: 10,
		isHighlighted: true,
	},
];

export const orderBumps: IOrderBump[] = [
	{
		id: 'br-extra-pack',
		market: 'BR',
		name: 'Adicionar embalagem extra',
		description: 'Inclua mais uma unidade com condição especial.',
		unitAmount: 17900,
		quantity: 1,
	},
	{
		id: 'us-extra-pack',
		market: 'US',
		name: 'Add extra bottle',
		description: 'Include one more bottle with a special offer.',
		unitAmount: 3500,
		quantity: 1,
	},
];
