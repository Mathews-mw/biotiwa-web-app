'use client';

import { ComponentProps, ForwardRefRenderFunction, forwardRef, useState } from 'react';

import { Input } from './ui/input';

interface InputControlProps extends ComponentProps<'input'> {
	onValidateDate?: (ìsValid: boolean) => void;
}

export const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputControlProps> = (
	{ onValidateDate, value = '', onChange, ...props },
	ref
) => {
	const [inputValue, setInputValue] = useState<string | number | readonly string[]>(value);

	// Função para aplicar a máscara de CPF
	const applyDateMask = (value: string): string => {
		return value
			.replace(/\D/g, '') // Remove caracteres não numéricos
			.replace(/(\d{2})(\d)/, '$1/$2') // Adiciona a primeira barra
			.replace(/(\d{2})(\d)/, '$1/$2') // Adiciona a segunda barra
			.replace(/(\d{4})\d+$/, '$1'); // Limita o ano a 4 dígitos
	};

	// Função para validar a lógica da data
	const isValidDate = (date: string): boolean => {
		const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([0-9]{4})$/;
		if (!regex.test(date)) {
			return false; // Formato inválido
		}

		const [day, month, year] = date.split('/').map(Number);
		const dateObject = new Date(year, month - 1, day);

		return dateObject.getFullYear() === year && dateObject.getMonth() === month - 1 && dateObject.getDate() === day;
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const rawValue = event.target.value;
		const maskedValue = applyDateMask(rawValue);

		setInputValue(maskedValue);
		const valid = isValidDate(maskedValue);

		onValidateDate?.(valid);

		onChange?.(event);
	};

	return (
		<Input
			ref={ref}
			value={inputValue}
			onChange={handleInputChange}
			maxLength={10}
			inputMode="numeric"
			placeholder="dd/mm/aaaa"
			{...props}
		/>
	);
};

export const DateInput = forwardRef(InputBase);
