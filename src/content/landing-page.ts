export const navigationItems = [
	{
		label: 'Produto',
		href: '#produto',
	},
	{
		label: 'Origem',
		href: '#origem',
	},
	{
		label: 'Diferenciais',
		href: '#diferenciais',
	},
	{
		label: 'Ciência',
		href: '#ciencia',
	},
	{
		label: 'Oferta',
		href: '#oferta',
	},
	{
		label: 'FAQ',
		href: '#faq',
	},
] as const;

export const productStorySteps = [
	{
		index: '01',
		eyebrow: 'Origem',
		title: 'Uma história que começa na Amazônia.',
		description:
			'Uma identidade inspirada na biodiversidade amazônica e apresentada por meio de uma experiência contemporânea.',
	},
	{
		index: '02',
		eyebrow: 'Desenvolvimento',
		title: 'Natureza e pesquisa na mesma narrativa.',
		description: 'Uma apresentação que aproxima ingredientes, formulação e informações relevantes para o consumidor.',
	},
	{
		index: '03',
		eyebrow: 'Transparência',
		title: 'Informação clara em cada detalhe.',
		description: 'Composição, orientações, certificações e origem organizadas de maneira simples e acessível.',
	},
	{
		index: '04',
		eyebrow: 'Rotina',
		title: 'Uma nova forma de conhecer o produto.',
		description: 'Uma experiência criada para acompanhar o consumidor desde a descoberta até a decisão de compra.',
	},
] as const;

export const ingredientItems = [
	{
		name: 'Açaí',
		label: 'Origem amazônica',
		description: 'Informações oficiais sobre o açaí utilizado no produto.',
		image: '/images/ingredients/acai.jpg',
		glow: 'rgba(155, 65, 190, 0.36)',
	},
	{
		name: 'Ingrediente 02',
		label: 'Composição',
		description: 'Substituir este conteúdo pelo segundo ingrediente e pelas informações aprovadas e revisadas.',
		image: '/images/ingredients/ingredient1.jpg',
		glow: 'rgba(219, 181, 109, 0.26)',
	},
	{
		name: 'Ingrediente 03',
		label: 'Formulação',
		description: 'Este espaço poderá explicar de maneira objetiva a participação do ingrediente na composição.',
		image: '/images/ingredients/ingredient2.jpg',
		glow: 'rgba(89, 155, 115, 0.28)',
	},
] as const;

export const faqItems = [
	{
		question: 'O que é o Açaípulse?',
		answer:
			'O Açaípulse é o produto apresentado pela Biotiwa Amazon Labs. A descrição técnica definitiva será inserida após aprovação do cliente e do responsável regulatório.',
	},
	{
		question: 'Quantas cápsulas existem na embalagem?',
		answer: 'A apresentação prevista para a primeira fase do projeto contém 60 cápsulas.',
	},
	{
		question: 'Onde estarão disponíveis as informações do produto?',
		answer:
			'Composição, forma de uso, informações nutricionais, certificações e demais orientações serão apresentadas na página detalhada do produto.',
	},
	{
		question: 'Para quais países serão realizadas entregas?',
		answer: 'Na primeira fase, a operação está planejada para entregas no Brasil e nos Estados Unidos.',
	},
	{
		question: 'O produto já está disponível para compra?',
		answer:
			'Esta página é uma apresentação inicial. A disponibilidade comercial e as condições de compra serão adicionadas durante a implementação do e-commerce.',
	},
] as const;
