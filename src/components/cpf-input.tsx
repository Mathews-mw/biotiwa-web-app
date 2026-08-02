import { ComponentProps, ForwardRefRenderFunction, forwardRef, useState } from 'react';

import { Input } from './ui/input';

type InputControlProps = ComponentProps<'input'>;

export const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputControlProps> = (
	{ value = '', onChange, ...props },
	ref
) => {
	const [inputValue, setInputValue] = useState<string | number | readonly string[]>(value);

	const applyCpfMask = (value: string): string => {
		return value
			.replace(/\D/g, '')
			.replace(/(\d{3})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d{2})$/, '$1-$2');
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const rawValue = event.target.value;
		const maskedValue = applyCpfMask(rawValue);

		setInputValue(maskedValue);
		onChange?.(maskedValue as unknown as React.ChangeEvent<HTMLInputElement>); // Notifica o valor ao pai, se fornecido
	};

	return (
		<Input
			ref={ref}
			inputMode="numeric"
			maxLength={14}
			placeholder="999-999-999-99"
			value={inputValue}
			onChange={handleInputChange}
			{...props}
		/>
	);
};

export const CpfInput = forwardRef(InputBase);
