import { motion } from 'motion/react';
import { twMerge } from 'tailwind-merge';
import type { ComponentProps, KeyboardEvent } from 'react';

import { Loader2, Search, X } from 'lucide-react';

interface IProps extends ComponentProps<'input'> {
	value?: string;
	isLoading?: boolean;
	onChangeValue: (value: string) => void;
	onSearch: () => void;
	onClear: () => void;
}

export function SearchInput({
	value,
	isLoading = false,
	onChangeValue,
	onSearch,
	onClear,
	className,
	...props
}: IProps) {
	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			onSearch();
		}
	};

	return (
		<div
			className={twMerge([
				'border-input selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex h-9 w-full min-w-0 items-center gap-2 rounded-md border bg-transparent pl-3 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
				'focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[1px]',
				'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 pr-2',
				className,
			])}
		>
			<input
				inputMode="search"
				value={value}
				onChange={(e) => onChangeValue(e.target.value)}
				onKeyDown={handleKeyDown}
				className="w-full py-1 outline-none"
				{...props}
			/>

			{isLoading ? (
				<Loader2 className="text-muted-foreground size-5 animate-spin" />
			) : (
				<>
					{value ? (
						<button className="cursor-pointer" onClick={onClear}>
							<motion.div initial={{ rotate: 0 }} animate={{ rotate: 90 }}>
								<X className="text-muted-foreground size-5" />
							</motion.div>
						</button>
					) : (
						<motion.div initial={{ rotate: 90 }} animate={{ rotate: 0 }}>
							<Search className="text-muted-foreground size-5" />
						</motion.div>
					)}
				</>
			)}
		</div>
	);
}
