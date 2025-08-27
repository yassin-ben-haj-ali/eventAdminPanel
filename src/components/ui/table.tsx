import * as React from "react";
import { cn } from "@/lib/utils";
import type { FilterType } from "@/UsersPage/store/types";
import { useStore } from "@/store/store";
import { FILTER_OPTIONS } from "@/lib/constants";
import CloseFilter from "@/assets/CloseFilter";
import ColumnFilter from "./ColumnFilter/ColumnFilter";

function Table({ className, ...props }: React.ComponentProps<"table">) {
	return (
		<div data-slot="table-container" className="relative w-full overflow-x-auto">
			<table
				data-slot="table"
				className={cn("w-full caption-bottom text-sm", className)}
				{...props}
			/>
		</div>
	);
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
	return <thead data-slot="table-header" className={cn("[&_tr]:border-b", className)} {...props} />;
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
	return (
		<tbody
			data-slot="table-body"
			className={cn("[&_tr:last-child]:border-0", className)}
			{...props}
		/>
	);
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
	return (
		<tfoot
			data-slot="table-footer"
			className={cn("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", className)}
			{...props}
		/>
	);
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
	return (
		<tr
			data-slot="table-row"
			className={cn(
				"hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
				className
			)}
			{...props}
		/>
	);
}

type TableHeadProps = {
	optionName: string;
	hideArrow?: boolean;
	filterType: FilterType;
	headerHeight?: string;
	filterParams?: {
		hideOrder?: boolean;
		hideSearch?: boolean;
	};
};
type OptionConfig = typeof FILTER_OPTIONS;

function TableHead({
	className,
	filterType,
	ref,
	children,
	hideArrow,
	filterParams,
	optionName,
	...props
}: React.ComponentProps<"th"> & TableHeadProps) {
	const filters = useStore((state) => state.user.tableFilters)[filterType] || [];
	const setFilters = useStore((state) => state.user.setTableFilters);

	const handleClearFilter = (optionName: string, filterValue: string) => {
		if (typeof setFilters === "function") {
			const updatedFilters = filters.filter(
				(filter) => !(filter.optionName === optionName && filter.filterValue === filterValue)
			);
			setFilters(filterType, updatedFilters);
		}
	};
	const getFilterName = (optionName: string, filterValue: string): string | undefined => {
		for (const optionGroupKey in FILTER_OPTIONS) {
			const optionGroup = FILTER_OPTIONS[optionGroupKey as keyof OptionConfig];
			if (optionGroup && optionGroup[optionName]) {
				const filtersArray = optionGroup[optionName as keyof typeof optionGroup];
				if (Array.isArray(filtersArray)) {
					const matchedFilter = filtersArray.find((filter) => filter.value === filterValue);
					if (matchedFilter) {
						return matchedFilter.name;
					}
				}
			}
		}
		return undefined; // Return undefined if no match is found
	};

	const getValueOfOrderFilter = (filterValue: string) => {
		return filterValue === "desc" ? "Ordre décroissant" : "Ordre croissant";
	};
	return (
		<th
			ref={ref}
			className={`relative h-20 cursor-pointer px-4 text-left align-middle font-medium whitespace-nowrap text-neutral-500 lg:h-28 dark:text-neutral-400 [&:has([role=checkbox])]:pr-0`}
			{...props}
		>
			<div className={cn("flex items-center gap-3", className)}>
				{children}
				{!hideArrow && (
					<div className="flex items-center justify-center">
						<ColumnFilter
							filterType={filterType}
							filterParams={filterParams}
							optionName={optionName}
						/>
						{filters.length &&
							filters.map((currentFilter, index) => {
								return (
									<div
										key={currentFilter.filterKey}
										style={{
											transform: "translateX(-50%)",
										}}
										className={`absolute left-[50%] ${index === 0 ? "top-[60%]" : "top-[80%]"} flex items-center justify-between rounded-[6px] bg-[#F0F0F0] px-1`}
									>
										<span className="min-w-[70px] flex-1 text-center text-[#4D2EB2] lg:min-w-[90px]">
											{currentFilter.filterKey === "radio"
												? getFilterName(currentFilter.optionName, currentFilter.filterValue)
												: currentFilter.filterKey === "order"
													? getValueOfOrderFilter(currentFilter.filterValue)
													: currentFilter.filterValue}
										</span>
										<button
											className="ml-3 flex h-4 w-4 items-center justify-center rounded-full bg-[#4D2EB2]"
											onClick={() =>
												handleClearFilter(currentFilter.optionName, currentFilter.filterValue)
											}
										>
											<CloseFilter />
										</button>
									</div>
								);
							})}
					</div>
				)}
			</div>
		</th>
	);
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
	return (
		<td
			data-slot="table-cell"
			className={cn(
				"p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
				className
			)}
			{...props}
		/>
	);
}

function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
	return (
		<caption
			data-slot="table-caption"
			className={cn("text-muted-foreground mt-4 text-sm", className)}
			{...props}
		/>
	);
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
