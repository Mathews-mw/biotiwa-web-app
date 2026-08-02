import { ComponentProps, ForwardRefRenderFunction, forwardRef, useState } from 'react';

import { Input } from './ui/input';

type InputControlProps = ComponentProps<'input'>;

export const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputControlProps> = (
	{ value = '', onChange, ...props },
	ref
) => {
	const [inputValue, setInputValue] = useState<string | number | readonly string[]>(value);

	const applyPhoneMask = (value: string): string => {
		return value
			.replace(/\D/g, '')
			.replace(/^(\d{2})(\d)/, '($1) $2')
			.replace(/(\d{1})\s(\d)/, '$1 $2')
			.replace(/(\d{4})(\d{4})$/, '$1-$2');
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const rawValue = event.target.value;
		const maskedValue = applyPhoneMask(rawValue);

		setInputValue(maskedValue);
		onChange?.(maskedValue as unknown as React.ChangeEvent<HTMLInputElement>); // Notifica o valor ao pai, se fornecido
	};

	return (
		<Input
			ref={ref}
			value={inputValue}
			onChange={handleInputChange}
			maxLength={15}
			inputMode="tel"
			placeholder="(99) 9 9999-9999"
			{...props}
		/>
	);
};

export const PhoneInput = forwardRef(InputBase);
