import * as React from "react";
import { cn } from "@/lib/utils";
import type { FilterType } from "@/UsersPage/store/types";

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

function TableHead({ className, ...props }: React.ComponentProps<"th"> & TableHeadProps) {
	return (
		<th
			data-slot="table-head"
			className={cn(
				"text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
				className
			)}
			{...props}
		/>
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
