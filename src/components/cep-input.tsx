import { ForwardRefRenderFunction, forwardRef, useState } from 'react';

import { Input } from './ui/input';

interface ICurrencyInputProps extends React.ComponentProps<'input'> {
	value: string;
	defaultValue?: string;
	onValueChange: (event: string) => void;
}

const formatCep = (value: string): string => {
	const numericValue = value.replace(/[^\d]/g, '');
	const cepValue = numericValue.replace(/(\d{5})(\d)/, '$1-$2');

	return cepValue;
};

const CepInputBase: ForwardRefRenderFunction<HTMLInputElement, ICurrencyInputProps> = (
	{ value, defaultValue, onValueChange, ...props },
	ref
) => {
	const [cepInputValue, setCepInputValue] = useState<string>(() => {
		const initialValue = value ?? defaultValue ?? '';

		return formatCep(initialValue);
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value;

		const formattedValue = formatCep(inputValue);

		setCepInputValue(formattedValue);
		onValueChange(formattedValue);
	};

	const isControlled = value !== undefined;
	const inputValue = isControlled ? formatCep(value) : cepInputValue;

	return (
		<Input
			ref={ref}
			color="primary"
			inputMode="numeric"
			maxLength={9}
			value={inputValue}
			onChange={handleChange}
			{...props}
		/>
	);
};

export const CepInput = forwardRef(CepInputBase);
