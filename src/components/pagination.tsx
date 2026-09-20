import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

import { Button } from './ui/button';

interface IProps {
	currentPage: number;
	totalCount: number;
	totalPages: number;
	perPage: number;
	onPageChange: (currentPage: number) => Promise<void> | void;
	disableTotalAmountLabel?: boolean;
	disablePerPageLabel?: boolean;
}

export function Pagination({
	currentPage,
	perPage,
	totalCount,
	totalPages,
	onPageChange,
	disableTotalAmountLabel = false,
	disablePerPageLabel = false,
}: IProps) {
	return (
		<div className="flex w-full items-center justify-between">
			<span className="text-muted-foreground text-sm">Total {totalCount} registers</span>

			<div className="flex items-center gap-4">
				{!disablePerPageLabel && (
					<div className="text-muted-foreground text-sm font-medium">
						Page {currentPage} of {totalPages}
					</div>
				)}

				<div className="flex items-center gap-2">
					<Button variant="outline" size="sm" onClick={() => onPageChange(1)} disabled={currentPage === 1}>
						<ChevronsLeft />
						<span className="sr-only">First</span>
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => onPageChange(currentPage - 1)}
						disabled={currentPage === 1}
					>
						<ChevronLeft />
						<span className="sr-only">Previous page</span>
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => onPageChange(currentPage + 1)}
						disabled={totalPages <= currentPage}
					>
						<ChevronRight />
						<span className="sr-only">Next page</span>
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => onPageChange(totalPages)}
						disabled={totalPages <= currentPage}
					>
						<ChevronsRight />
						<span className="sr-only">Last page</span>
					</Button>
				</div>
			</div>
		</div>
	);
}
